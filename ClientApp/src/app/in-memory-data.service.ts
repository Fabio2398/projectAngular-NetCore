import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './classes/hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  constructor() { }

  createDb() {
    const heroes = [
      { id: 11, name: 'Spiderman' },
      { id: 12, name: 'Acquaman' },
      { id: 13, name: 'Thor' },
      { id: 14, name: 'IronMan' },
      { id: 15, name: 'Capitan America' },
      { id: 16, name: 'DeadPool' },
      { id: 17, name: 'Hulk' },
      { id: 18, name: 'Wolverine' },
      { id: 19, name: 'Black Panther' },
      { id: 20, name: 'Cat Woman' }
    ];
    return {heroes};
  }

  
  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.Id)) + 1 : 11;
  }


}
