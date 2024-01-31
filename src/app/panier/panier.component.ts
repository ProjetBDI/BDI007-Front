import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Panier, PanierEtape } from '../shared/services/eltDefinitions';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit{

  readonly obsPanier$ : Observable<Panier | undefined>;

  bsPanierEtapes = new BehaviorSubject<PanierEtape[] | undefined >([]);

  bsPaiement = new BehaviorSubject<boolean>(false);

  listFestivaliers: string[] = [];

  constructor(private api: ApiService,readonly us: UserService) { 
    this.obsPanier$ = this.us.obsFestiUsers$.pipe(
      switchMap( async u => await this.api.getPanierByID(1) 
      )
        // async u => await this.api.getCurrentPanierByUtilisateur(u!.idUtilisateur) )
    )

    this.obsPanier$.pipe(
      tap( async p => {
        if (p !== undefined) {
          // enlever les [] dans le string nomsFestivaliers
          let nomsFestivaliers = p.nomsFestivaliers;
          nomsFestivaliers = nomsFestivaliers.substring(1, nomsFestivaliers.length-1);
          // enlever les '' dans le string nomsFestivaliers 
          nomsFestivaliers = nomsFestivaliers.replace(/'/g, "");
          // mettre les noms dans un tableau
          this.listFestivaliers = nomsFestivaliers.split(", ");
          // récupérer les panierEtapes du panier
          this.bsPanierEtapes.next(await this.api.getPanierEtapeByPanier(p.idPanier));
        }
      })
    ).subscribe(
    )
  }
  
  ngOnInit(): void {
    
  }

}
