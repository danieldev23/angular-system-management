import { BriefTemplateService } from './../../../core/auto_api/backend/api/briefTemplate.service';
import { BriefTemplate } from './../../../core/auto_api/backend/model/briefTemplate';
import { ListAdmissionPeriodsComponent } from './../../../components/list-admission-periods/controller.component';
// login/controller.component.ts

import { Component } from '@angular/core';
import { MyBaseComponent } from '../../my-base.component';
import { AuthService, EnrollmentPeriod, EnrollmentPeriodService} from 'src/app/core/auto_api/backend';

@Component({
    selector: 'app-screen-index-admin-component',
    templateUrl: './template.component.html',
    styleUrls: ['./style.component.scss'],
})
export class IndexAdminComponent extends MyBaseComponent {
    listAdmissions: EnrollmentPeriod[] = [];
    listPeriods: BriefTemplate[] = [];
    constructor(private enrollmentPeriodService: EnrollmentPeriodService, private briefTemplateService: BriefTemplateService) {
      super();
    }
  
    override ngOnInit(): void {
      this.getAllAdmissions();
      this.getAllPeriods();
    }
  
    private getAllAdmissions(): void {
      this.startMsgLoading('Đang tải danh sách các kỳ tuyển sinh');
      this.enrollmentPeriodService
        .apiEnrollmentPeriodGet()
        .subscribe((response) => {
          this.listAdmissions = response.data ?? [];
          this.removeMsgLoading();
        });
    }
    private getAllPeriods(): void{
      this.startMsgLoading('Đang tải danh sách form');
      this.briefTemplateService
      .apiBriefTemplateLastTemplateGet()
      .subscribe((response) => {
        this.listPeriods = response.data ?? [];
        this.removeMsgLoading();
      })
    }
}
