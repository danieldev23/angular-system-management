import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AcademicFormService {
  academicForm: FormGroup = new FormGroup({
    academicCode: new FormControl(''),
    academicYearPrefix: new FormControl(''),
    academicDegree: new FormControl(''),
  });

  constructor() {}

  updateAcademicForm(data: any): void {
    this.academicForm.setValue({
      academicCode: data.code,
      academicYearPrefix: data.academicYearPrefix,
      academicDegree: data.academicDegree,
    });
  }
}
