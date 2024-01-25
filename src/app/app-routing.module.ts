import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RechercheComponent } from './recherche/recherche.component';


const routes: Routes = [
  {
    path:'',
  component: AppComponent
  }, {
    path:'recherche',
    component: RechercheComponent
  }, {
    path: '**',
      component: AppComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
