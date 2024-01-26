import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  goToRecherche() {
    this.router.navigateByUrl("recherche");
  }

  goToHome() {
    this.router.navigateByUrl("");
  }

  getRouterUrl() {
    return this.router.url;
  }
}
