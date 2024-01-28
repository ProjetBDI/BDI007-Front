import { Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import {  doc, docData, Firestore, FirestoreDataConverter, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { FestiUser } from '../../eltDefinitions';

const conv : FirestoreDataConverter<FestiUser> = {
  toFirestore : val => val,
  fromFirestore : snap => ({
    name : snap.get("name"),
    email : snap.get("email"),
    photoUrl : snap.get("photoUrl")
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  obsFestiUsers$ : Observable<FestiUser|undefined>;
  bsAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private auth: Auth, private fs : Firestore) { 
    authState(this.auth).pipe(
      filter( u => !!u ),
      map( u => u as User ),
      tap( async u => {
        const docUser =  doc(this.fs, `users/${u.uid}`).withConverter(conv) ;
        const snapUser = await getDoc( docUser );
        if (!snapUser.exists()) {
          setDoc(docUser, {
            name: u.displayName ?? "",
            email: u.email ?? "",
            photoUrl: u.photoURL ?? ""

          } satisfies FestiUser)
        }
      })
    ).subscribe()


    this.obsFestiUsers$ = authState(this.auth).pipe(
      switchMap( (user) => {
        if(user){
          const userRef = doc(this.fs , `users/${user.uid}`).withConverter(conv)
          const userData$ = docData(userRef)
          return userData$
        } else{
          return of(undefined)
        }
      })
    )
   }

  //Fonction pour se connecter à firebase
  async login() {
    this.bsAuth.next(true); // on passe l'état de la connection à false
    const googleProvider = new GoogleAuthProvider(); // on utilise le provider Google

    googleProvider.setCustomParameters({ // on demande à l'utilisateur de choisir son compte
      prompt: 'select_account'
    });

    try{
      await signInWithPopup(this.auth, googleProvider); // on ouvre une popup pour se connecter
    } catch(e){
      console.log("Login error (Google): " + e); // si erreur, on affiche l'erreur de login
    }

    this.bsAuth.next(false); // on passe l'état de la connection à false
  }

  //fonction pour se deconnecter de firebase
  async logout() {
    
    try{
      await signOut(this.auth); // on se déconnecte
    } catch(e){
      console.log("Logout failed (Google): " + e); // si erreur, on affiche l'erreur de logout
    }
  }

  //Retourne un User (firebase) si l'utilisateur est connecté, erreur sinon
  async getUser(): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      authState(this.auth).subscribe(u => {
        if (u != null) {

          resolve(u);
        }
      }, error => {
        reject(error);
      });
    });
  }

  //Retourne un MiahootUser (firebase) si l'utilisateur est connecté, erreur sinon
  async  getIdUserFB(): Promise<string> {
    const user = await this.getUser();
    if (user) {
      return user.uid;
    }
    return "nullUserId";
  }
}
