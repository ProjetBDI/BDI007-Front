import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { BehaviorSubject, Observable, async, filter, map, of, switchMap } from 'rxjs';
import { Covoiturage, Etape, FestiUser, Panier } from '../shared/services/eltDefinitions';
import { UserService } from '../shared/services/user.service';
import { convUserBDToFestiUser } from '../shared/services/eltConverters';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit{

  protected obsPanier$ : Observable<Panier | undefined>

  protected bsPaiement = new BehaviorSubject<boolean>(false);

  protected paniers: Panier[] = [];

  constructor(private api: ApiService,readonly us: UserService) { 
    
    this.obsPanier$ = this.us.obsFestiUsers$.pipe(
      switchMap( async ( user) => {
        if(user){
          const panierBD = await this.api.getPanierByID(1)
          if (panierBD === undefined) {
            return undefined
          }else {            
            
            // const panier : Panier = {
            //   id: panierBD.id,
            //   datePaiement: panierBD.datePaiement,
            //   proprietaire: ,
            //   nomFestivaliers: panierBD.nomFestivaliers,
            //   nbPlaceOccuppee: panierBD.nbPlaceOccuppee,
            //   etapes: panierBD.etapes,
            // }

            return panierBD
          }          
        } else{
          return undefined
        }
      })
    )

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
