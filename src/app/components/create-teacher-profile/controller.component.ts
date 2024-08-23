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
import { ProfileInfoRequest } from '../../core/auto_api/backend/model/profileInfoRequest';
import { EnrollmentTeacherService } from '../../core/auto_api/backend/api/enrollmentTeacher.service';

@Component({
  selector: 'app-create-teacher-profile-component',
  templateUrl: './template.component.html',
})
export class CreateTeacherProfileComponent extends MyBaseComponent implements OnInit {
  @Input({required: true}) period!: BriefTemplate;
  @Input({required: true}) admissions!: EnrollmentPeriod;


  teacherProfileForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    numberphone: new FormControl('')
  });

  constructor(private enrollmentTeacherService: EnrollmentTeacherService) {
    super();
  }

  override ngOnInit(): void {
  }

  onCreate() {
    const id = Number(this.admissions.id);
    if (this.teacherProfileForm.valid) {
      const formValue = this.teacherProfileForm.getRawValue();
      const { fullName, email, numberphone } = formValue;
      const body: ProfileInfoRequest = {
        fullName: fullName!,
        email: email!,
        numberphone: numberphone!,
      };
      console.table(formValue);
      this.enrollmentTeacherService.apiEnrollmentTeacherEnrollmentIdPost(id, body
      ).subscribe((response) => {
        console.log(`POST API SPC: ${response}`)
        window.location.reload();
      })
    }
  }
}
