// login/controller.component.ts
import { Component } from '@angular/core';
import {
  EnrollmentPeriodAcademicDegree,
  EnrollmentPeriodService,
} from 'src/app/core/auto_api/backend';
import { MyBaseComponent } from 'src/app/modules/my-base.component';
import { FormCreateAdmission } from 'src/app/models/form.admission.model';
import { FormControl, FormGroup } from '@angular/forms';
import { EnrollmentPeriodRequest } from '../../core/auto_api/backend/model/enrollmentPeriodRequest';

@Component({ 
  selector: 'app-create-admission-component',
  templateUrl: './template.component.html'
})
export class CreateAdmissionComponent extends MyBaseComponent {
  createForm: FormGroup<FormCreateAdmission>;

  constructor(private enrollmentPeriodService: EnrollmentPeriodService) {
    super();
    this.createForm = new FormGroup<FormCreateAdmission>({
      academicYearPrefix: new FormControl<string | null>(''),
      academicYearStart: new FormControl<number | null>(null),
      academicYearEnd: new FormControl<number | null>(null),
      academicDegree: new FormControl<EnrollmentPeriodAcademicDegree | null>(
        null
      ),
      startTime: new FormControl<Date | null>(null),
      isSendingResumesFreely: new FormControl<number | null>(0),
    });
  }
  onCreate() {

    if (!this.createForm?.invalid) {
      // this.isFormVisible = true;
      const formValue = this.createForm.getRawValue();
      const dataReq: EnrollmentPeriodRequest = {
        academicYearPrefix: formValue.academicYearPrefix!,
        academicYearStart: formValue.academicYearStart!,
        academicYearEnd: formValue.academicYearEnd!,
        academicDegree: formValue.academicDegree!,
        startTime: formValue.startTime!,
        isSendingResumesFreely: formValue.isSendingResumesFreely ? 0 : 1,
      };
      this.enrollmentPeriodService
        .apiEnrollmentPeriodPost(dataReq)
        .subscribe((response) => {
          if (response.success) {
            this.showMsgSuccess('Tạo hồ sơ thành công!');
            window.location.reload();
          } else {
            this.showMsgFailure('Tạo hồ sơ thất bại!');
          }
        });

    }
  }
}
