import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Covoiturage, Utilisateur, Festival, Panier, PanierEtape, Etape, IPanier } from './eltDefinitions';
import { Observable, lastValueFrom } from 'rxjs';
import { convUtilisateurToUtilisateurBD } from './eltConverters';
import { NumberFormatStyle } from '@angular/common';

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

  getCurrentPanierByUtilisateur(id: number): Promise<Panier | undefined>{
    return lastValueFrom(this.http.get<Panier>(this.apiPath + `/panier/utilisateur/current/${id}`));
  }

  getPanierByID(id: number) : Promise<Panier | undefined>{
    return lastValueFrom(this.http.get<Panier>(this.apiPath + `/panier/${id}`));
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

  getUtilisateurByEmail(email: string) : Promise<Utilisateur | undefined>{
    return lastValueFrom(this.http.get<Utilisateur>(this.apiPath + `/utilisateur/email/${email}`));
  }

  postUtilisateur(user: Utilisateur) : Promise<Utilisateur | undefined>{
    const res = JSON.parse(JSON.stringify(convUtilisateurToUtilisateurBD(user)));
    return lastValueFrom(this.http.post<Utilisateur>(this.apiPath + `/utilisateur/create`, res));
  }


  /**
   * Confirmation commande
   */

  paiementPanier(idPanier: number) : Promise<Panier> {
    return lastValueFrom(this.http.patch<Panier>(this.apiPath + `/panier/payer/${idPanier}`, ""));
  }

  postPanierEtapes(panierEtapes: PanierEtape[]) : Promise<PanierEtape[]> {
    const res = '{ "panierEtapeCreateList" : [';
    
    panierEtapes.forEach(panierEtape => {
      res.concat(JSON.stringify(panierEtape));
    });
    res.concat(']}');
    const resultat = JSON.parse(res);
    return lastValueFrom(this.http.post<PanierEtape[]>(this.apiPath + `/panierEtapes`, resultat));
  }

  deletePanierEtape(idPanierEtape: number) : Promise<PanierEtape> {
    return lastValueFrom(this.http.delete<PanierEtape>(this.apiPath + `/panierEtape/${idPanierEtape}`));
  }


}
