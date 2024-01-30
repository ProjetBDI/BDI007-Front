import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Festival } from '../shared/services/eltDefinitions';
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

  constructor(protected rs: Router, private api: ApiService, protected ds: DataService) { }

  constituteResult(id : string): Observable<Festival> {
    
    this.selected = undefined;
    
    return this.api.getFestivalByID(id).pipe(map((data: Partial<Observer<Festival>>) => {
      let festival: Festival = data as Festival;
      return festival;
    }));
  }

  search() {
    this.result = [];

    this.ds.inSearch.next(true);

    let festival: Festival | undefined;
    console.log("--------------------------------");
    for(let i = 1; i < 20; i++) {
      this.constituteResult(String(i)).subscribe(festival => {
        this.result.push(festival);
      });
    }
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
