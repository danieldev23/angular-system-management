import { Component } from '@angular/core';
import { MyBaseComponent } from 'src/app/modules/my-base.component';
import { EnrollmentPeriod } from 'src/app/core/auto_api/backend';
import { EnrollmentPeriodService } from 'src/app/core/auto_api/backend';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './template.component.html',
    styleUrls: ['./style.component.scss'],
})
export class AuthLayoutComponent extends MyBaseComponent {
  listExams: EnrollmentPeriod[] = [];

  constructor(
    private enrollmentPeriodService: EnrollmentPeriodService) {
    super();
  }
}

