import { Component } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { BehaviorSubject, Observable, filter, map, switchMap, tap } from 'rxjs';
import { Panier, PanierEtape } from '../shared/services/eltDefinitions';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent{

  readonly obsPanier$ : Observable<Panier | undefined>;

  obsPanierEtapes$ : Observable<PanierEtape[] | undefined>;

  bsPaiement = new BehaviorSubject<number>(-1);

  sommePrix: number = 0;

  listPrixEtapes: number[] = [];

  listFestivaliers: string[] = [];

  private idPanier: number = -1;

  constructor(readonly api: ApiService, readonly us: UserService, readonly router: Router) {
    this.obsPanier$ = this.us.obsFestiUsers$.pipe(
      switchMap( async u => {
        try {
          const user = await this.api.getUtilisateurByEmail(u!.email);

          if (user?.idUtilisateur === null || user?.idUtilisateur === undefined || user?.idUtilisateur === -1) {
            return undefined;
          }
          return this.api.getCurrentPanierByUtilisateur(user?.idUtilisateur!)

        } catch (error) {
          return undefined
        }
      }),
      tap( async p => {
        if (p !== undefined || p !== null) {
          this.idPanier = p?.idPanier ?? -1;
        }
      })
    )

    this.obsPanierEtapes$ = this.obsPanier$.pipe(
      tap( async p => {
        if (p !== undefined || p !== null) {

          // enlever les [] dans le string nomsFestivaliers
          let nomsFestivaliers = p?.nomsFestivaliers ?? "";
          nomsFestivaliers = nomsFestivaliers.substring(1, nomsFestivaliers.length-1);
          // enlever les '' dans le string nomsFestivaliers 
          nomsFestivaliers = nomsFestivaliers.replace(/'/g, "");
          // mettre les noms dans un tableau
          this.listFestivaliers = nomsFestivaliers.split(", ");
        }
      }),
      switchMap( async p => {
        if (p === undefined || p === null) {
          return undefined;
        }
        return await this.api.getPanierEtapeByPanier(p!.idPanier);
      } )
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
    
    this.api.paiementPanier(this.idPanier);
    
  }

  toHome() {
    this.bsPaiement.next(-1);
    this.router.navigateByUrl("recherche")
  }

  deletePanierEtape(id: number) {
    this.obsPanierEtapes$.subscribe( async pe => {
      if (pe !== undefined) {
        pe.forEach( async e => {
          // supprimer le panier etape de la liste
          if (e.idPanierEtape === id) {
            await this.api.deletePanierEtape(e.idPanierEtape);
          }
        })
        return pe;
      }
      return undefined;
    })
  }


}
