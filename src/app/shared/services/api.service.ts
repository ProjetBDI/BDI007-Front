import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiPath = "/api/v1"

  constructor(private http: HttpClient, private us: UserService) { }


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

  getPanierForUser(){
    // return this.http.get(this.apiPath + `/panier/${this.user}`);
  }

  // Utilisateurs

  postUser(){
    // return this.http.post(this.apiPath + `/user`, this.user);
  }


}
