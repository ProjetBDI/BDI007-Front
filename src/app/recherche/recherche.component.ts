import { Component } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Etape, Festival, Panier, InstanciationPanier, InstanciationPanierEtape, Utilisateur } from '../shared/services/eltDefinitions';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent {

  festivals: (Festival|undefined)[] = [];
  etapes: (Etape|undefined)[] = [];
  selected: Festival | undefined;
  etapesSelected: (Etape | undefined)[] = [];

  nbPass: number = 0;
  nbPlacesPrises: number = 0;
  placesPrises: number[] = [];
  nbPages: number = 1;
  options: string[] = ["ouvert", "ferme", "plein"];
  departements: string[] = ["1","2","3"];

  userEmail: string = "";
  panierCourant: Panier | undefined;

  festiSearch = new FormGroup({
    festiNom: new FormControl(''),
    festiDate: new FormControl(new Date()),
    festiTarif: new FormControl(''),
    festiOptions: new FormControl('')
  })

  etapeSearch = new FormGroup({
    etapeDate: new FormControl(new Date()),
    etapeDep: new FormControl('')
  })

  constructor(protected rs: Router, 
    private api: ApiService, 
    protected ds: DataService, 
    protected us: UserService) {

    this.us.obsFestiUsers$.subscribe(
      u => {
        if (u !== undefined) {
          this.userEmail = u.email;
        }
      }
    )
   }

  search(searchType: string) {
    
    this.festivals = [];
    this.etapes = [];
    
    this.ds.inSearch.next(true);
    
    if(searchType === "festival"){
      from(this.api.getFestivalsWithPageAndName(this.nbPages, this.festiSearch.controls.festiNom.value || '')).subscribe((festivals: Festival[]) => { 
        this.nbPages = festivals.length;
        festivals.forEach((festival: Festival) => {
          festival.status = festival.nbPassDispo === 0 ? "PLEIN" : (festival.dateFin < new Date() ? "FERME" : "OUVERT");
          this.festivals.push(festival);
        });
      });
    } else if(searchType === "etape") {
      from(this.api.getEtapesByFestival(this.nbPages, this.selected?.idFestival || 0)).subscribe((etapes: Etape[]) => { 
        this.nbPages = etapes.length;
        etapes.forEach((etape: Etape) => {
          this.etapes.push(etape);
          this.placesPrises.push(0);
          this.etapesSelected.push(undefined);
        });
      });
    }
  }

  addPass(selected: Festival | undefined) {
    if(selected!.nbPassDispo > 0) {
      this.nbPass++;
      selected!.nbPassDispo -= 1;
      this.selected = selected;
    }
    selected!.nbPassDispo <= 0 ? selected!.status = "PLEIN" : selected!.status = "OUVERT";
  }

  addPlace(covoit: Etape | undefined, index: number) {
    if(this.nbPlacesPrises < this.nbPass) {
      this.placesPrises[index]++;
      this.etapesSelected[index] = this.placesPrises[index] === 0 ? undefined : covoit;
      covoit!.idCovoiturage!.nbPlaceDispo -= 1;
      this.nbPlacesPrises += 1;
    }
  }

  rmPass(selected: Festival | undefined) {
    this.nbPass = this.nbPass === 0 ? 0 : (this.nbPass - 1);
    selected!.nbPassDispo += 1;
    selected!.status = this.nbPass === 0 ? "OUVERT" : selected!.status;
    this.selected = this.nbPass === 0 ? undefined : this.selected;
  }

  rmPlace(covoit: Etape | undefined, index: number) {
    this.placesPrises[index] = this.placesPrises[index] === 0 ? 0 : (this.placesPrises[index] - 1);
    this.etapesSelected[index] = this.placesPrises[index] === 0 ? undefined : this.etapesSelected[index];
    covoit!.idCovoiturage!.nbPlaceDispo += 1;
    this.nbPlacesPrises = this.nbPlacesPrises === 0 ? 0 : (this.nbPlacesPrises - 1);
  }

  toCovoits() { 
    if(this.selected){
      this.nbPages = 1;
      this.ds.searchType.next("etape");
      this.search(this.ds.searchType.value);
    }
  }

  instanciatePanier() {

    from(this.api.getUtilisateurByEmail(this.userEmail)).subscribe((user: Utilisateur | undefined) => {
      if(user !== undefined) {
        from(this.api.getCurrentPanierByUtilisateur(user.idUtilisateur)).subscribe((panier: Panier | undefined) => {
          this.panierCourant = panier;
          if(this.panierCourant === undefined) { 
            let nouveauPanier: InstanciationPanier = {
              nomsFestivaliers: "[]",
              idProprietaire: user!.idUtilisateur
            }
  
            from(this.api.postPanier(nouveauPanier)).subscribe((panier: Panier) => {
              this.panierCourant = panier;
  
              let instancesPanierEtape: InstanciationPanierEtape[] = [];
              for(let i = 0; i < this.etapesSelected.length; i++) {
                let element = this.etapesSelected[i];
                if(element !== undefined) {
                  let panierEtape: InstanciationPanierEtape = {
                    nbPlaceOccupe:this.placesPrises[i],
                    idPanier: this.panierCourant!.idPanier,
                    idEtape: element.idEtape
                  }
                  instancesPanierEtape.push(panierEtape);
                }
              }
  
              this.panierEtapeBody(instancesPanierEtape);
            });
  
          } else {
            
            let instancesPanierEtape: InstanciationPanierEtape[] = [];
              for(let i = 0; i < this.etapesSelected.length; i++) {
                let element = this.etapesSelected[i];
                if(element !== undefined) {
                  let panierEtape: InstanciationPanierEtape = {
                    nbPlaceOccupe:this.placesPrises[i],
                    idPanier: this.panierCourant!.idPanier,
                    idEtape: element.idEtape
                  }
                  instancesPanierEtape.push(panierEtape);
                }
              }
  
              this.panierEtapeBody(instancesPanierEtape);
  
          }
      })}
    });
  }

  panierEtapeBody(panierEtapes: InstanciationPanierEtape[]) {
    let panierEtapeCreateList = '{ "panierEtapeCreateList" : ';
    
    let bodyRes = panierEtapes.map(panierEtape => {
      return {
        nbPlaceOccuppe: panierEtape.nbPlaceOccupe,
        idPanier: panierEtape.idPanier,
        idEtape: panierEtape.idEtape
      };
    });

    panierEtapeCreateList += (JSON.stringify(bodyRes));

    panierEtapeCreateList += ('}');

    this.instanciatePanierEtape(JSON.parse(panierEtapeCreateList));
  }

  instanciatePanierEtape(body: any) {
    
    from(this.api.postPanierEtape(body)).subscribe((panierEtapes: any) => {
      console.log("PanierEtape instancié: " + panierEtapes);
    });
  }

  toAccueil() {
    this.rs.navigateByUrl("")
  }
}
