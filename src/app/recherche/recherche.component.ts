import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Commune, Domaine, Festival } from '../shared/services/eltDefinitions';
import { Observable, Observer, from, map } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { connectFirestoreEmulator } from '@angular/fire/firestore';

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

  constructor(protected rs: Router, private api: ApiService, protected ds: DataService) { console.log("INIT RECHERCHE") }

  search() {
    
    this.result = [];
    
    this.ds.inSearch.next(true);
    
    from(this.api.getFestivalsWithPageAndName(1,"")).subscribe((festivals: Festival[]) => { 
      this.nbPages = festivals.length;
      festivals.forEach((festival: Festival) => {
        console.log(festival);
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
