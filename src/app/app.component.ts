import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { RoutingService } from './routing.service';

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
