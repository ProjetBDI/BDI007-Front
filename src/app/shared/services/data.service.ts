import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  inSearch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); //TODO régler problème maj

  constructor() { }
  
}
