// login/controller.component.ts
import { Component, Input, OnInit } from '@angular/core';
import {
  BriefTemplate,
  EnrollmentPeriod,
  EnrollmentPeriodAcademicDegree,
} from 'src/app/core/auto_api/backend';
import { MyBaseComponent } from 'src/app/modules/my-base.component';
import { FormCreateAdmission } from 'src/app/models/form.admission.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileInfoService } from '../../core/auto_api/backend/api/profileInfo.service';
import { ProfileInfoRequest } from '../../core/auto_api/backend/model/profileInfoRequest';

@Component({
  selector: 'app-create-student-profile-component',
  templateUrl: './template.component.html',
})
export class CreateStudentProfileComponent extends MyBaseComponent implements OnInit {
  @Input({required: true}) period!: BriefTemplate;
  @Input({required: true}) admissions!: EnrollmentPeriod;


  studentProfileForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    numberphone: new FormControl(''),
    status: new FormControl(''),
    noteText: new FormControl(''),
  });

  constructor(private profileInfoService: ProfileInfoService) {
    super();
  }

  override ngOnInit(): void {
  }

  onCreate() {
    const id = Number(this.admissions.id);
    if (this.studentProfileForm.valid) {
      const formValue = this.studentProfileForm.getRawValue();
      const { fullName, email, numberphone, status, noteText } = formValue;
      const body: ProfileInfoRequest = {
        fullName: fullName!,
        email: email!,
        numberphone: numberphone!,
      };
      console.table(formValue);
      this.profileInfoService.apiProfileInfoEnrollmentIdPost(id, body
      ).subscribe((response) => {
        console.log(`POST API SPC: ${response}`)
        window.location.reload();
      })
    }
  }
}
