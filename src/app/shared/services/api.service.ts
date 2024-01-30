import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Covoiturage, Etape, FestiUser, Panier, PanierState } from './eltDefinitions';
import { Observable, filter, forkJoin, map, of, startWith, switchMap } from 'rxjs';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiPath = "/api/v1"

  readonly obsPanierState$: Observable<PanierState>;

  constructor(private http: HttpClient, private us: UserService) {
    this.obsPanierState$ = this.us.bsAuth.pipe(
      startWith(undefined),
      filter(U => !!U),
      switchMap((user) => {
        return this.http.get<Panier>(this.apiPath + `/panier/${user}`).pipe(
          switchMap((panier: Panier) => {
            // Assuming you have an API endpoint to get the covoiturage and etapes data
            const covoiturage$ = this.http.get<Covoiturage>(this.apiPath + `/covoiturage/${panier}`);
            const etapes$ = this.http.get<Etape[]>(this.apiPath + `/etapes/${panier}`);

            return forkJoin({ panier: of(panier), covoiturage$, etapes$ }).pipe(
              map(({ panier, covoiturage$, etapes$ }) => {
                return {
                  panier,
                  covoiturage: covoiturage$,
                  etapes: etapes$
                } as PanierState;
              })
            );
          })
        );
      })
    );
  }

  /* FESTIVALS */

  getFestivals(){
    return this.http.get(this.apiPath + `/festivals`);
  }

  getFestivalsWithPage(page: number){
    return this.http.get(this.apiPath + `/festivals/${page}`);
  }

  getFestivalsWithPageAndName(page: number, name: string){
    let regex = /^ *$/;
    if(regex.test(name)){ name = "%20"; }
    return this.http.get(this.apiPath + `/festivals/page/1/name/${name}`);
  }

  getFestivalByID(id: number){
    return this.http.get(this.apiPath + `/festival/${id}`);
  }


  /* COVOITURAGES */

  getCovoiturages(){
    return this.http.get(this.apiPath + `/covoiturages`);
  }

  getCovoituragesWithPage(page: number){
    return this.http.get(this.apiPath + `/covoiturages/${page}`);
  }

  getCovoituragebyID(id: number){
    return this.http.get(this.apiPath + `/covoiturage/${id}`);
  }

  /* PANIERS */

  getCurrentPanierByUtilisateur(id: number){
    return this.http.get(this.apiPath + `/panier/utilisateur/current/${id}`)
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
    return this.http.get(this.apiPath + `/etape/${id}`);
  }

  /* UTILISATEURS */

  getUtilisateurByID(id: number){
    return this.http.get(this.apiPath + `/utilisateur/${id}`);
  }

  getUtilisateurByEmail(email: string){
    return this.http.get(this.apiPath + `/utilisateur/email/${email}`);
  }


}
