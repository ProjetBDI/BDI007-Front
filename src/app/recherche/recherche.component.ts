import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoutingService } from '../shared/services/routing.service';
import { ApiService } from '../shared/services/api.service';
import { Festival } from '../eltDefinitions';
import { Observable, Observer, map } from 'rxjs';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent {

  result: (Festival|undefined)[] = [];
  searched: boolean = false;
  selected: Festival | undefined;
  nbPass: number = 0;

  constructor(protected rs: RoutingService, private api: ApiService) { }

  constituteResult(id : String): Observable<Festival> {
    this.searched = true;

    
    return this.api.getFestivalByID(id).pipe(map((data: Partial<Observer<Festival>>) => {
      let festival: Festival = data as Festival;
      return festival;
    }));
  }

  search() {
    this.result = [];

    this.rs.inSearch = true;

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
