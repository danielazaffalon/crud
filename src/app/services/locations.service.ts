import { Injectable } from '@angular/core';
import { Location } from '../model/interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  locations: Location[] = [];

  constructor() { }

  getLocations():Observable<Location[]> {
    const locations = window.localStorage.getItem('locations')!;
    if(locations !== null){
      this.locations = JSON.parse(locations)
    }
    return of(this.locations);
  }

  getLocationById(id: string): Location | undefined {
    const locations = window.localStorage.getItem('locations')!;
    if(locations !== null)
      return JSON.parse(locations).find((item: Location) => item.id === id)
    else
      return undefined;
  }

  setLocation(location: Location) {
    const locationIndex = this.locations.findIndex((item: Location) => item.id === location.id);
    if(locationIndex >= 0)
      this.locations[locationIndex] = location;
    else
    this.locations.push(location);
    window.localStorage.setItem('locations',JSON.stringify(this.locations));
  }

  deleteLocation(location: Location) {
    const locationIndex = this.locations.findIndex((item: Location) => item.id === location.id);
    if(locationIndex >= 0)
      this.locations.splice(locationIndex, 1);
    else
    this.locations.push(location);
    window.localStorage.setItem('locations',JSON.stringify(this.locations));
  }

  // getLocations():Location[] {
  //   const locations = window.localStorage.getItem('locations')!;
  //   if(locations !== null)
  //     eturn JSON.parse(locations)
  //   else
  //    return [];
  // }

  // getLocationById(id: string): Location | undefined {
  //   const locations = window.localStorage.getItem('locations')!;
  //   if(locations !== null)
  //     return JSON.parse(locations).find((item: Location) => item.id === id)
  //   else
  //     return undefined;
  // }

  // setLocation(location: Location) {
  //   const locations = this.getLocations();
  //   const locationIndex = locations.findIndex((item: Location) => item.id === location.id);
  //   if(locationIndex >= 0)
  //     locations[locationIndex] = location;
  //   else
  //     locations.push(location);
  //   window.localStorage.setItem('locations',JSON.stringify(locations));
  // }
}
