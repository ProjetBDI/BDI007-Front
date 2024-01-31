import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Panier } from '../shared/services/eltDefinitions';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit{

  readonly obsCurrentPanier$ : Observable<Panier | undefined>;

  readonly obsPanier$ : Observable<Panier | undefined>;

  constructor(private api: ApiService,readonly us: UserService) { 
    this.obsCurrentPanier$ = this.us.obsFestiUsers$.pipe(
      switchMap( async u => await this.api.getCurrentPanierByUtilisateur(u!.idUtilisateur) )
    )

    this.obsPanier$ = this.obsCurrentPanier$.pipe(
      switchMap( async p => await this.api.getPanierEtapeByPanier(p!.idPanier) )
    )
  }
  
  ngOnInit(): void {
    // call of get panier for this User
  }

}
