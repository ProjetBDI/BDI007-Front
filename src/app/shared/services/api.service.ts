import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Covoiturage, Utilisateur, Festival, Panier, PanierEtape, Etape, IPanier } from './eltDefinitions';
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
    return lastValueFrom(this.http.get<Array<Festival>>(this.apiPath + `/festivals`));
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
    return lastValueFrom(this.http.get<Array<Covoiturage>>(this.apiPath + `/covoiturages`));
  }

  getCovoituragesWithPage(page: number){
    return lastValueFrom(this.http.get<Array<Covoiturage>>(this.apiPath + `/covoiturages/page/${page}`));
  }

  getCovoituragesWithPageAndFestival(page: number, idFestival: number){
    return lastValueFrom(this.http.get<Array<Covoiturage>>(this.apiPath + `/covoiturages/page/${page}/festival/${idFestival}`));
  }

  getCovoituragebyID(id: number){
    return lastValueFrom(this.http.get<Covoiturage>(this.apiPath + `/covoiturage/${id}`));
  }

  /* PANIER-ETAPES */

  getPanierEtapeByPanier(id: number) : Promise<PanierEtape[] | undefined>{
    return lastValueFrom(this.http.get<PanierEtape[]>(this.apiPath + `/panierEtapes/${id}/panier`));
  }

  postPanierEtape(infosInstanciation: string) {
    return lastValueFrom(this.http.post<PanierEtape>(this.apiPath + `/panierEtapes/create`, infosInstanciation));
  }

  /* PANIERS */

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

  postPanier(panier: IPanier) {
    return lastValueFrom(this.http.post<Panier>(this.apiPath + `/panier`, panier));
  }

  /* ETAPES */

  getEtapeByID(id: number){
    return this.http.get(this.apiPath + `/etape/${id}`);
  }

  getEtapesByFestival(page: number, idFestival: number){
    return lastValueFrom(this.http.get<Array<Etape>>(this.apiPath + `/festival/${idFestival}/covoiturage/etapes/page/${page}`));
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

  async postUtilisateur(user: Utilisateur) : Promise<HttpErrorResponse | any>{
    const res = JSON.parse(JSON.stringify(user));
    console.log(res);
    try {
      // return this.http.post<any>(this.apiPath + `/utilisateur/create`, user);
    }
    catch(e){
      return undefined;
    }
  }


}
