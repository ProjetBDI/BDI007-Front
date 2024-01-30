import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Covoiturage, FestiUser, Panier, PanierState } from './eltDefinitions';
import { Observable, filter, map, of, startWith, switchMap } from 'rxjs';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiPath = "/api/v1"

  // readonly obsPanierState$: Observable<PanierState>;

  constructor(private http: HttpClient, private us: UserService) {
    // this.obsPanierState$ = this.us.bsAuth.pipe(
    //   startWith(undefined),
    //   filter(U => !!U),
    //   map(U => U as unknown as FestiUser),
    //   switchMap( (user) => {
    //     return this.http.get(this.apiPath + `/panier/${user}`).pipe(
    //       map( (panier: Panier) => {
    //         return {
    //           panier: panier,
    //           covoiturage: panier.covoiturage,
    //           etapes: panier.etapes,
    //         } as PanierState
    //       })
    //     )
    //   })
  

      
    // ) satisfies Observable<PanierState>
  }

  /* FESTIVALS */

  getFestivals(){
    return this.http.get(this.apiPath + `/festival`);
  }

  getFestivalByID(id: string){
    return this.http.get(this.apiPath + `/festival/ + ${id}`);
  }


  /* COVOITURAGES */

  getCovoiturages(){
    return this.http.get(this.apiPath + `/covoiturage`);
  }

  getCovoituragebyID(id: number){
    return this.http.get(this.apiPath + `/covoiturage/ + ${id}`);
  }

  // Panier

  getPanierForUser() : Observable<Panier | undefined>{
    return of(undefined);
    // return this.http.get(this.apiPath + `/panier/${this.user}`);
  }

  // Utilisateurs

  postUser(){
    // return this.http.post(this.apiPath + `/user`, this.user);
  }


}
