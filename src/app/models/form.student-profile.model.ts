import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root',
})

export class StudentFormProfile {
 
  studentFormProfile: FormGroup = new FormGroup({
    id: new FormControl(''),
  
  });
  

}