import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiCustom = "/api/v1"

  constructor(private http: HttpClient, private us: UserService) { }

  /* FESTIVALS */

  getFestivals(){
    return this.http.get(`/festivals`);
  }

  getFestivalByID(id: String){
    return this.http.get(`/festivals/ + ${id}`);
  }


  /* COVOITURAGES */

  getCovoiturages(){
    return this.http.get(`/covoiturages`);
  }

  getCovoituragebyID(id: number){
    return this.http.get(`/covoiturages/ + ${id}`);
  }


}
