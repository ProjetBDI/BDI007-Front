import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(private appService: AppService) { }

	title = 'angular-nodejs-example';

	person: any;
    
    connected = false;

	ngOnInit() {
		this.appService.getPerson()
			.subscribe((person: any) => {
				this.person = person;
                this.connected = true;
			});
	}
}
