import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { ApiService } from '../services/api.service';
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

  constructor(private rs: RoutingService, private api: ApiService) { }

  constituteResult(id : String): Observable<Festival> {
    this.searched = true;

    
    return this.api.getFestivalByID(id).pipe(map((data: Partial<Observer<Festival>>) => {
      let festival: Festival = data as Festival;
      return festival;
    }));
  }

  search() {
    let festival: Festival | undefined;
    console.log("--------------------------------");
    for(let i = 1; i < 20; i++) {
      this.constituteResult(String(i)).subscribe(festival => {
        console.log(festival);
        this.result.push(festival);
      });
    }
  }
}
