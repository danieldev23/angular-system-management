import { Component, Input } from '@angular/core';
import { EnrollmentPeriod, EnrollmentPeriodService } from 'src/app/core/auto_api/backend';
import { MyBaseComponent } from 'src/app/modules/my-base.component';

@Component({
    selector: 'app-list-admission-periods-component',
    templateUrl: './template.component.html',
})
export class ListAdmissionPeriodsComponent extends MyBaseComponent {
    @Input() listAdmissions: EnrollmentPeriod[] = [];
    constructor(private enrollmentPeriodService: EnrollmentPeriodService) {
        super();
    }
    onDelete(admissions: any) :void {
        this.startConfirmAction(
          'Thông báo',
          `Bạn muốn xoá hồ sơ có mã ${admissions.code} không?`,
          'Có',
          'Không'
        ).then((yesOrNo) => {
          if (yesOrNo) {
            this.enrollmentPeriodService
              .apiEnrollmentPeriodIdDelete(admissions.id)
              .subscribe((response) => {
                if (response.success) {
                  this.showMsgSuccess(`Xoá thành công hồ sơ có mã ${admissions.code}`);
                  window.location.reload();
                } else {
                  this.showMsgFailure(`Xoá thất bại hồ sơ có mã ${admissions.code}`);
                }
              });
          }
        });
      }
    
}
