import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RechercheComponent } from './recherche/recherche.component';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PanierComponent } from './panier/panier.component';


const routes: Routes = [
  {
    path: 'connexion',
    component: ConnexionComponent
  }, {
    path:'recherche',
    component: RechercheComponent
  }, {
    path:'panier',
    component: PanierComponent
  },{
    path:'',
    redirectTo: 'recherche',
    pathMatch: 'full'
  }, {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
