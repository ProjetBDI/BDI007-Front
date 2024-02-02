import { Component, ElementRef, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  bsMenu = new BehaviorSubject<string>("")

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.bsMenu.next("");
    }
  }

  constructor(protected us : UserService, protected rs: Router, private ds: DataService, private eRef: ElementRef) {
    const partie = document.getElementById("app-partie");
    if (partie) {
      partie.addEventListener("unload", () => {
        
      });
    }
  }

  async login() {
    this.bsMenu.next("");
    this.rs.navigateByUrl('connexion')
  }

  async logout() {
    this.bsMenu.next("");
    this.us.logout();
    this.rs.navigateByUrl("");
  }

  goBack() {
    this.ds.inSearch.next(false);
    this.ds.searchType.next("festival");
    this.rs.navigateByUrl("");
  }

}
