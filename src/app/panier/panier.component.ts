import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit{

  constructor(private api: ApiService) { 
    
  }
  
  
  ngOnInit(): void {
    // call of get panier for this User
  }
}
