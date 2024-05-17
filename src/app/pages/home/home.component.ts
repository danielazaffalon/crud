import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '../../model/interfaces';
import { LocationsService } from '../../services/locations.service';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, FormComponent, HeaderComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  title = "Home";
  locations: Location[] = [];
  // locationForm!: FormGroup;

  constructor(private locationService: LocationsService){  }

  ngOnInit(): void {
    this.getLocations();
    // this.createForm();
  }

  selectedLocation?: Location;
  onSelect(location: Location): void {
    this.selectedLocation = location;
  }

  // createForm(){
  //   this.locationForm = new FormGroup({
  //     id: new FormControl('', Validators.required),
  //     name: new FormControl(''),
  //     lat: new FormControl(''),
  //     lon: new FormControl(''),
  //     type: new FormControl(''),
  //     description: new FormControl(''),
  //     enable: new FormControl(''),
  //   });
  // }

  getLocations(){
    this.locationService.getLocations().subscribe(locations => this.locations=locations);
    // this.locations = this.locationService.getLocations();
  }

  deleteLocation(location: Location){
    this.selectedLocation = location;
    this.locationService.deleteLocation(location);
    this.selectedLocation = undefined;
  }
}
