import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Commune, Covoiturage, Domaine, Festival } from '../shared/services/eltDefinitions';
import { Observable, Observer, from, map } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { connectFirestoreEmulator } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent {

  festivals: (Festival|undefined)[] = [];
  covoits: (Covoiturage|undefined)[] = [];
  selected: Festival | undefined;

  nbPass: number = 0;
  nbPlacesPrises: number = 0;
  nbPages: number = 0;
  options: string[] = ["ouvert", "ferme", "plein"];
  departements: string[] = ["1","2","3"];
  typeRecherche: string = "festival";

  festiSearch = new FormGroup({
    festiNom: new FormControl(''),
    festiDate: new FormControl(new Date()),
    festiTarif: new FormControl(''),
    festiOptions: new FormControl('')
  })

  covoitSearch = new FormGroup({
    covoitDate: new FormControl(new Date()),
    covoitDep: new FormControl('')
  })

  constructor(protected rs: Router, private api: ApiService, protected ds: DataService) { console.log("INIT RECHERCHE") }

  search(typeRecherche: string) {
    
    this.festivals = [];
    
    this.ds.inSearch.next(true);
    
    if(typeRecherche === "festival"){
      from(this.api.getFestivalsWithPageAndName(this.nbPages, this.festiSearch.controls.festiNom.value || '')).subscribe((festivals: Festival[]) => { 
        this.nbPages = festivals.length;
        festivals.forEach((festival: Festival) => {
          this.festivals.push(festival);
        });
      });
    } else if(typeRecherche === "covoiturage") {
      // from(this.api.getCovoituragesWithPageAndFestival(this.nbPages, this.selected?.id || 0)).subscribe((covoiturages: Covoiturage[]) => { 
      //   this.nbPages = covoiturages.length;
      //   covoiturages.forEach((covoiturage: Covoiturage) => {
      //     this.covoits.push(covoiturage);
      //   });
      // });
    }
  }

  addPass(selected: Festival | undefined) {
    this.nbPass++;
    this.selected = this.nbPass === 0 ? undefined : selected;
  }

  rmPass() {
    this.nbPass = this.nbPass === 0 ? 0 : (this.nbPass - 1);
    this.selected = this.nbPass === 0 ? undefined : this.selected;
  }

  toCovoits() {
    if(this.selected){
      this.typeRecherche = "covoiturage";
      this.search(this.typeRecherche);
    }
  }
}
