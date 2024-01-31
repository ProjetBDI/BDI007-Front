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
  covoitsSelected: (Covoiturage | undefined)[] = [];

  nbPass: number = 0;
  placesPrises: number[] = [];
  nbPages: number = 1;
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

  constructor(protected rs: Router, private api: ApiService, protected ds: DataService) { }

  search(typeRecherche: string) {
    
    this.festivals = [];
    this.covoits = [];
    
    this.ds.inSearch.next(true);
    
    if(typeRecherche === "festival"){
      from(this.api.getFestivalsWithPageAndName(this.nbPages, this.festiSearch.controls.festiNom.value || '')).subscribe((festivals: Festival[]) => { 
        this.nbPages = festivals.length;
        festivals.forEach((festival: Festival) => {
          this.festivals.push(festival);
        });
      });
    } else if(typeRecherche === "covoiturage") {
      from(this.api.getCovoituragesWithPageAndFestival(this.nbPages, this.selected?.idFestival || 0)).subscribe((covoiturages: Covoiturage[]) => { 
        this.nbPages = covoiturages.length;
        covoiturages.forEach((covoiturage: Covoiturage) => {
          console.log(covoiturage);
          this.covoits.push(covoiturage);
          this.placesPrises.push(0);
          this.covoitsSelected.push(undefined);
        });
      });
    }
  }

  addPass(selected: Festival | undefined) {
    this.nbPass++;
    this.selected = this.nbPass === 0 ? undefined : selected;
  }

  addPlace(covoit: Covoiturage | undefined, index: number) {
    this.placesPrises[index]++;
    this.covoitsSelected[index] = this.placesPrises[index] === 0 ? undefined : covoit;
  }

  rmPass() {
    this.nbPass = this.nbPass === 0 ? 0 : (this.nbPass - 1);
    this.selected = this.nbPass === 0 ? undefined : this.selected;
  }

  rmPlace(index: number) {
    this.placesPrises[index] = this.placesPrises[index] === 0 ? 0 : (this.placesPrises[index] - 1);
    this.covoitsSelected[index] = this.placesPrises[index] === 0 ? undefined : this.covoitsSelected[index];
  }

  toCovoits() { console.log("Festival sélectionné: ", this.selected);
    if(this.selected){ console.log("toCovoits")
      this.nbPages = 1;
      this.typeRecherche = "covoiturage";
      this.search(this.typeRecherche);
    }
  }
}
