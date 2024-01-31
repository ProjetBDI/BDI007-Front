import { Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, user } from '@angular/fire/auth';
import {  doc, docData, Firestore, FirestoreDataConverter, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { FestiUser } from './eltDefinitions';
import { convUserCredentialToFestiUser, convUserToFestiUser } from './eltConverters';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

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
        const docUser =  doc(this.fs, `users/${u.uid}`).withConverter(convUserToFestiUser) ;
        const snapUser = await getDoc( docUser );
        if (!snapUser.exists()) {
          setDoc(docUser, {
            nom: u.displayName?.split(" ")[1] ?? "",
            prenom: u.displayName?.split(" ")[0] ?? "",
            email: u.email ?? "",
            photoUrl: u.photoURL ?? "",
            dateNaissance: new Date(2000, 1, 1),
          } satisfies FestiUser)
        }
      })
    ).subscribe()


    this.obsFestiUsers$ = authState(this.auth).pipe(
      switchMap( (user) => {
        if(user){
          const userRef = doc(this.fs , `users/${user.uid}`).withConverter(convUserToFestiUser)
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
      console.log("Login success ! : "); // si réussi, on affiche un message de réussite
    } catch(e){
      console.log("Login error (Google): " + e); // si erreur, on affiche l'erreur de login
    }

    this.bsAuth.next(false); // on passe l'état de la connection à false
  }

  // fonction se connecter avec adresse mail
  async loginMail(email: string, password: string) {
    this.bsAuth.next(true); // on passe l'état de la connection à false

    try{
      await signInWithEmailAndPassword(this.auth, email, password); // on ouvre une popup pour se connecter
    } catch(e){
      console.log("Login error (Mail): " + e); // si erreur, on affiche l'erreur de login
    }

    this.bsAuth.next(false); // on passe l'état de la connection à false
  }

  async registerMail(nom: string, prenom: string, dateNaissance: Date, email:string, password: string): Promise<FestiUser | void> {
    try {
      let uc = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.loginMail(email, password);
      const userRef = doc(this.fs, `users/${uc.user?.uid}`).withConverter(convUserToFestiUser);
      await setDoc(userRef, {
        nom: nom,
        prenom: prenom,
        dateNaissance: dateNaissance,
        email: email,
        photoUrl: "",
      } as FestiUser);
      
      console.log("Register success !", user.name);
      this.bsAuth.next(true);
      return convUserCredentialToFestiUser(uc);

    } catch (exception) {
      console.log("Register failed ! ", exception);
      this.bsAuth.next(false);
    }

  };

  //fonction pour se deconnecter de firebase
  async logout() {
    
    try{
      await signOut(this.auth); // on se déconnecte
    } catch(e){
      console.log("Logout failed (Google): " + e); // si erreur, on affiche l'erreur de logout
    }
  }
}
