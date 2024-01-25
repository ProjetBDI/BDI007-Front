import { Component } from '@angular/core';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(protected rs: RoutingService) { }
}
