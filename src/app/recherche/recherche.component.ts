import { Component } from '@angular/core';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent {

  test: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(private rs: RoutingService) { 

  }
}
