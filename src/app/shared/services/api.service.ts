import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Panier } from './eltDefinitions';

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

  getFestivalsWithPage(page: number){
    return this.http.get(this.apiPath + `/festival/ + ${page}`);
  }

  getFestivalByID(id: number){
    return this.http.get(this.apiPath + `/festival/ + ${id}`);
  }


  /* COVOITURAGES */

  getCovoiturages(){
    return this.http.get(this.apiPath + `/covoiturage`);
  }

  getCovoituragesWithPage(page: number){
    return this.http.get(this.apiPath + `/covoiturage/ + ${page}`);
  }

  getCovoituragebyID(id: number){
    return this.http.get(this.apiPath + `/covoiturage/ + ${id}`);
  }

  /* PANIERS */

  getCurrentPanierByUtilisateur(id: number){
    return this.http.get(this.apiPath + `/panier/utilisateur/current/ + `)
  }

  postPanier(panier: Panier){
    //TODO
  }

  parsePanier(panier: Panier){
    // let panierJSON = {
    //   "datePaiement": panier.date,
    //   "nomFestivaliers": panier.nomFestivaliers,
    //   "idProprietaire": 
    // }
    // return panierJSON;
  }

  /* ETAPES */

  getEtapeByID(id: number){
    return this.http.get(this.apiPath + `/etape/ + ${id}`);
  }

  /* UTILISATEURS */

  getUtilisateurByID(id: number){
    return this.http.get(this.apiPath + `/utilisateur/ + ${id}`);
  }

  getUtilisateurByEmail(email: string){
    return this.http.get(this.apiPath + `/utilisateur/email/ + ${email}`);
  }


}
