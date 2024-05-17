import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../model/interfaces';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  locationForm!: FormGroup;
  @Input() location?: Location;
  
  constructor(private locationService: LocationsService){}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges():void {
    // if(this.location)
    if(this.locationForm)
      this.locationForm.patchValue({
        id: this.location?.id??'',
        name: this.location?.name??'',
        lat: this.location?.lat??'',
        lon: this.location?.lon??'',
        type: this.location?.type??'',
        description: this.location?.description??'',
        enable: this.location?.enable??false,
      })
  }

  createForm(){
    this.locationForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      lat: new FormControl('', Validators.required),
      lon: new FormControl('', Validators.required),
      type: new FormControl(''),
      description: new FormControl(''),
      enable: new FormControl(''),
    });
  }

  saveLocation(){
    if(this.locationForm.valid){
      const location: Location = this.locationForm.value;    
      this.locationService.setLocation(location);
      // this.getLocations();
    }
    else
      console.log("Invalid")
  }

  deleteLocation(){
    this.locationService.deleteLocation(this.locationForm.value);
    this.locationForm.patchValue({
      id: '',
      name: '',
      lat: '',
      lon: '',
      type: '',
      description: '',
      enable: false,
    })
  }
  
}
