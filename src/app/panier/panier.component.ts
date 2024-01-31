import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Covoiturage, Etape, Panier } from '../shared/services/eltDefinitions';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit{

  protected obsPanier$ : Observable<Panier | undefined>

  protected bsPaiement = new BehaviorSubject<boolean>(false);

  protected paniers: Panier[] = [];

  constructor(private api: ApiService, private us: UserService) { 
    
    this.obsPanier$ = this.api.getPanierByID(1).pipe(
      // map((panier: Panier) => {
      //   date: panier.date,
      //   proprietaire: panier.idProprietaire,
      //   nomFestivaliers: panier.nomFestivaliers,
      //   nbPlaceOccuppee: panier.nbPlaceOccuppee,
      //   etapes: panier.etapes
      //   return panier;
      // })
    );

    // let panier : Panier = {
    //   date: new Date(),
    //   proprietaire: undefined,
    //   nomFestivaliers: ["Arthur", "Alex", "Kyks", "Vincent"],
    //   nbPlaceOccuppee: 4,
    //   etapes: [],
    // }
    // this.paniers = [panier, panier, panier];
    
    // this.obsPanier$ = new Observable<Panier | undefined>(subscriber => {
    //   subscriber.next(panier);
    // });
    
    // à remplacer par l'appel de l'api
  }
  
  ngOnInit(): void {
    // call of get panier for this User
  }

}
