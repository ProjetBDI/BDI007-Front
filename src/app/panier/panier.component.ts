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

  readonly obsPanierEtapes$ : Observable<PanierEtape[] | undefined>;

  bsPaiement = new BehaviorSubject<number>(-1);

  sommePrix: number = 0;

  listPrixEtapes: number[] = [];

  listFestivaliers: string[] = [];

  constructor(private api: ApiService, readonly us: UserService) {
    this.obsPanier$ = this.us.obsFestiUsers$.pipe(
      switchMap( async u => {
        try {
          return await this.api.getPanierByID(1)
          // this.api.getCurrentPanierByUtilisateur(u!.idUtilisateur)
        } catch (error) {
          return undefined
        }
      }
      )
    )

    this.obsPanierEtapes$ = this.obsPanier$.pipe(
      tap( async p => {
        if (p !== undefined) {

          // enlever les [] dans le string nomsFestivaliers
          let nomsFestivaliers = p.nomsFestivaliers;
          nomsFestivaliers = nomsFestivaliers.substring(1, nomsFestivaliers.length-1);
          // enlever les '' dans le string nomsFestivaliers 
          nomsFestivaliers = nomsFestivaliers.replace(/'/g, "");
          // mettre les noms dans un tableau
          this.listFestivaliers = nomsFestivaliers.split(", ");
        }
      }),
      switchMap( async p => await this.api.getPanierEtapeByPanier(p!.idPanier) )
    )

    this.obsPanierEtapes$.pipe(
      tap( async pe => {
        if (pe !== undefined) {
          this.sommePrix = 0;
          this.listPrixEtapes = [];

          pe.forEach( e => {
            this.listPrixEtapes.push((e.idEtape.prixEtape + e.idEtape.idCovoiturage.idFestival.tarifPass) * e.idPanier.nomsFestivaliers.split(", ").length);

            this.sommePrix += (e.idEtape.prixEtape + e.idEtape.idCovoiturage.idFestival.tarifPass) * e.idPanier.nomsFestivaliers.split(", ").length
            
          })
        }
      })
    ).subscribe()
  }

  toValidation() {
    this.bsPaiement.next(1);
    // this.api.updatePanier(1, this.listFestivaliers.toString(), new Date())
  }
  
  ngOnInit(): void {
    
  }

}
