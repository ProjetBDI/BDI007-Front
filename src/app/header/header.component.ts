import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FestiUser } from '../eltDefinitions';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../shared/services/user.service';
import { RoutingService } from '../shared/services/routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<FestiUser | undefined> | undefined; // utilisateur connecté
  inMenu: boolean = false;
  elements: string[] = ["Panier", "Historique", "Covoiturage", "Gestion", "Connexion"];

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
      data => {
        if (data) {
          this.elements[4] = "Déconnexion";
        } else {
          this.elements[4] = "Connexion";
        }
      },
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

  async gestConnexion() {
    if (this.elements[4] === "Déconnexion")  {
      this.logout();
    } else {
      this.login();
    }
  }

  changeMenuState() {
    this.inMenu = !this.inMenu;
  }

}
