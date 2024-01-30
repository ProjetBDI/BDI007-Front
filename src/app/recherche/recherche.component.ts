import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Commune, Domaine, Festival } from '../shared/services/eltDefinitions';
import { Observable, Observer, map } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent {

  result: (Festival|undefined)[] = [];
  selected: Festival | undefined;
  nbPass: number = 0;
  nbPages: number = 0;

  constructor(protected rs: Router, private api: ApiService, protected ds: DataService) { }

  search() {
    this.result = [];

    this.ds.inSearch.next(true);

    let festival: Festival | undefined;

    this.api.getFestivalsWithPageAndName(1,"").subscribe((response: Object): void => {
      (response as any[]).forEach(item => {
        festival = {
          nom: item.nom,
          dateDebut: item.dateDebut,
          dateFin: item.dateFin,
          siteWeb: item.siteWeb,
          lieuPrincipal: item.lieuPrincipal,
          nbPassTotal: item.nbPassTotal,
          nbPassDispo: item.nbPassDispo,
          nbPassIndispo: item.nbPassIndispo,
          tarifPass: item.tarifPass,
          status: item.status,
          idCommune: item as Commune,
          idDomaine: item as Domaine
        };

        this.result.push(festival);
      });
    });

  }

  addPass(selected: Festival | undefined) {
    this.nbPass++;
    this.selected = this.nbPass === 0 ? undefined : selected;
  }

  rmPass() {
    this.nbPass = this.nbPass === 0 ? 0 : (this.nbPass - 1);
    this.selected = this.nbPass === 0 ? undefined : this.selected;
  }
}
