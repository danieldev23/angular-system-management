import { Component, Input } from '@angular/core';
import { EnrollmentPeriod, ProfileInfoRequest, BriefTemplate, ProfileBriefTemplate, ProfileInfoProfileBriefTemplateRequest, AdmissionProfile } from 'src/app/core/auto_api/backend';
import { MyBaseComponent } from 'src/app/modules/my-base.component';
import { ProfileInfoService } from '../../core/auto_api/backend/api/profileInfo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-step-2-brief-component',
  templateUrl: './template.component.html',
})
export class Step2BriefComponent extends MyBaseComponent {
  @Input({ required: true }) admissions!: EnrollmentPeriod;
  @Input({ required: true }) admissionProfiles: AdmissionProfile[] = [];
  constructor(
    private profileInfoService: ProfileInfoService,
    private route: ActivatedRoute
  ) {
    super();
  }
  override ngOnInit(): void {
      console.log(`Step2BriefComponent ${this.admissions}`);
  }
}
