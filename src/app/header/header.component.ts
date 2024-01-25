import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FestiUser } from '../eltDefinitions';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<FestiUser | undefined> | undefined; // utilisateur connecté

  constructor(protected us : UserService, protected rs: RoutingService) {
    const partie = document.getElementById("app-partie");
    if (partie) {
      partie.addEventListener("unload", () => {
        
      });
    }
  }

  ngOnInit(): void {
    this.user$ = this.us.obsFestiUsers$;
    this.user$.subscribe(
      data => console.log(data),
      error => console.error(error),
      () => console.log('Observable complet')
    );
  }

  async login() {
    this.us.login();
  }

  async logout() {
    this.us.logout();
  }

  goHome() {
    this.rs.goToHome();
  }

}
