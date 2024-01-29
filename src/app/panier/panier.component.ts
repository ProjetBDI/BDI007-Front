import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Panier } from '../shared/services/eltDefinitions';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit{

  protected obsPanier$ : Observable<Panier | undefined>

  protected bsPaiement = new BehaviorSubject<boolean>(false);

  constructor(private api: ApiService, private us: UserService) { 
    // this.obsPanier$ = this.api.getPanier();
    let panier : Panier = {
      id: "1",
      date: new Date(),
      idProprietaire: "1",
      nomFestivaliers: ["Arthur","Alex", "Kyks", "Vincent"]
    }
    this.obsPanier$ = new Observable<Panier | undefined>(subscriber => {
      subscriber.next(panier);
    });
    // à remplacer par l'appel de l'api
  }
  
  ngOnInit(): void {
    // call of get panier for this User
  }

}
