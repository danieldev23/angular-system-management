import { Component } from '@angular/core';
import { MyBaseComponent } from '../../my-base.component';
import {
  EnrollmentPeriod,
  EnrollmentPeriodService,
} from 'src/app/core/auto_api/backend';

@Component({
  selector: 'app-screen-admissions-admin-component',
  templateUrl: './template.component.html',
  styleUrls: ['./style.component.scss'],
})
export class AdmissionsAdminComponent extends MyBaseComponent {
  listAdmissions: EnrollmentPeriod[] = [];
  constructor(private enrollmentPeriodService: EnrollmentPeriodService) {
    super();
  }

  override ngOnInit(): void {
    this.getAllAdmissions();
  }

  private getAllAdmissions(): void {
    this.startMsgLoading('Đang tải danh sách các kỳ tuyển sinh');
    this.enrollmentPeriodService
      .apiEnrollmentPeriodGet()
      .subscribe((response) => {
        this.listAdmissions = response.data ?? [];
        console.log(response.data);
        this.removeMsgLoading();
      });
  }
}
