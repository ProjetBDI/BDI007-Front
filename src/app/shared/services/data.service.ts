import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  inSearch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchType: BehaviorSubject<string> = new BehaviorSubject<string>('festival');

  constructor() { }
  
}
