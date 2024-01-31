import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Covoiturage, Utilisateur, Festival, Panier, PanierEtape } from './eltDefinitions';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiPath = "/api/v1"

  constructor(private http: HttpClient, private us: UserService) {
    
  }

  /* FESTIVALS */

  getFestivals(){
    return lastValueFrom(this.http.get(this.apiPath + `/festivals`));
  }

  getFestivalsWithPage(page: number){
    return lastValueFrom(this.http.get<Array<Festival>>(this.apiPath + `/festivals/page/${page}`));
  }

  getFestivalsWithPageAndName(page: number, name: string){
    let regex = /^ *$/;
    if(regex.test(name)){ name = "%20"; }
    return lastValueFrom(this.http.get<Array<Festival>>(this.apiPath + `/festivals/page/1/name/${name}`));
  }

  getFestivalByID(id: number){
    return lastValueFrom(this.http.get<Festival>(this.apiPath + `/festival/${id}`));
  }


  /* COVOITURAGES */

  getCovoiturages(){
    return lastValueFrom(this.http.get(this.apiPath + `/covoiturages`));
  }

  getCovoituragesWithPage(page: number){
    return lastValueFrom(this.http.get(this.apiPath + `/covoiturages/page/${page}`));
  }

  getCovoituragesWithPageAndFestival(page: number, idFestival: number){
    return lastValueFrom(this.http.get(this.apiPath + `/covoiturages/page/${page}/festival/${idFestival}`));
  }

  getCovoituragebyID(id: number){
    return lastValueFrom(this.http.get<Covoiturage>(this.apiPath + `/covoiturage/${id}`));
  }

  /* PANIERS */

  getPanierEtapeByPanier(id: number) : Promise<PanierEtape[] | undefined>{
    return lastValueFrom(this.http.get<PanierEtape[]>(this.apiPath + `/panierEtapes/${id}/panier`));
  }

  async getCurrentPanierByUtilisateur(id: number): Promise<Panier | undefined>{
    try {
      return await lastValueFrom(this.http.get<Panier>(this.apiPath + `/panier/utilisateur/current/${id}`));
    }
    catch(e){
      return undefined;
    }
  }

  async getPanierByID(id: number) : Promise<Panier | undefined>{
    try {
      return await lastValueFrom(this.http.get<Panier>(this.apiPath + `/panier/${id}`));
    }
    catch(e){
      return undefined;
    }
  }

  postPanier(panier: Panier){
    return this.http.post(this.apiPath + `/panier`, panier);
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

  async getUtilisateurByEmail(email: string) : Promise<Utilisateur | undefined>{
    try{
      return await lastValueFrom(this.http.get<Utilisateur>(this.apiPath + `/utilisateur/email/${email}`));
    }
    catch(e){
      return undefined;
    }
  }

  postUtilisateur(user: Utilisateur){
    return this.http.post(this.apiPath + `/utilisateur/create`, user);
  }


}
