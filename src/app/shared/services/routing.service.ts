import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  inSearch: boolean = false;

  constructor(private router: Router) { }

  goToRecherche() {
    this.router.navigateByUrl("recherche");
  }

  goToHome() {
    this.inSearch = false;
    this.router.navigateByUrl("");
  }

  getRouterUrl() {
    return this.router.url;
  }
}
