import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { ApiService } from '../services/api.service';
import { Festival } from '../eltDefinitions';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent {

  result: (Festival|undefined)[] = [];
  searched: boolean = false;

  constructor(private rs: RoutingService, private api: ApiService) { }

  constituteResult(id : String): Festival | undefined {
    this.searched = true;

    
    this.api.getFestivalByID(id).subscribe((data: Partial<Observer<Festival>>) => {
      let festival: Festival = data as Festival;
      return festival
    });
    return undefined;
  }

  search() {
    let id: number = 0;
    let festival: Festival | undefined;

    for(let i = 0; i < this.result.length; i++) {
      festival = this.constituteResult(String(id));
      this.result.push(festival);
    }
  }
}
