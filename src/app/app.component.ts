import { Component, OnInit } from '@angular/core';
import { RoutingService } from './services/routing.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor( protected rs: RoutingService) { }

	title = 'Festicar';

	ngOnInit() {
	}
}
