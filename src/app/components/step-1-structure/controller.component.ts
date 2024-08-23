import { BriefTemplateRequest } from './../../core/auto_api/backend/model/briefTemplateRequest';
import { BriefTemplateService } from './../../core/auto_api/backend/api/briefTemplate.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BriefTemplate, EnrollmentPeriod } from 'src/app/core/auto_api/backend';
import { MyBaseComponent } from 'src/app/modules/my-base.component';
import { AdmissionsDetailAdminComponent } from '../../modules/admin/admissions-detail-admin/controller.component';

@Component({
  selector: 'app-step-1-structure-component',
  templateUrl: './template.component.html',
})
export class Step1StructureComponent extends MyBaseComponent {
  @Input({ required: true }) period!: BriefTemplate;
  @Input({ required: true }) admissions!: EnrollmentPeriod;
  @Output() onSaved = new EventEmitter<void>();

  data: BriefTemplate[]=[];

  academicForm = new FormGroup({
    academicCode: new FormControl(''),
    academicYearPrefix: new FormControl(''),
    academicDegree: new FormControl(''),
  });

  periodForm = new FormGroup({
    attributeName: new FormControl(''),
    attributeType: new FormControl(''),
    isRequire: new FormControl(false),
  });

  constructor(
    private briefTemplateService: BriefTemplateService
  ) {
    super();
  }

  override ngOnInit(): void {
    console.log("Step 1 structure component");
    
    this.loadBriefTemplates();
  }

  loadBriefTemplates(): void {
    this.briefTemplateService
      .apiBriefTemplateLastTemplateGet(this.admissions.id)
      .subscribe((response) => {
        this.data = response.data ?? [];
        console.log(`Step 1 structure component ${JSON.stringify(this.data)})`);
        
        this.initializeForms();
      });
  }


  onHandleCreateBriefTemplate(index: number) {
    const briefTemplateNew: BriefTemplate = { 
        enrollmentId: this.admissions.id,
        attributeName: '',
        attributeType: 'string',
        isRequire: 0
    }

    this.data.splice(index + 1, 0, briefTemplateNew);
  }

  onHandleRemoveBriefTemplate(index: number) {
    this.data.splice(index, 1);
  }

  private initializeForms(): void {
    if (this.admissions) {
      this.academicForm.patchValue({
        academicCode: this.admissions.code,
        academicDegree: this.admissions.academicDegree,
        academicYearPrefix: this.admissions.academicYearPrefix,
      });
    }

    if (this.period) {
      this.periodForm.patchValue({
        attributeName: this.period.attributeName,
        attributeType: this.period.attributeType,
        isRequire: this.period.isRequire === 1,
      });
    }
  }

  handleUpdateForm(): void {
    // Gọi API để cập nhật dữ liệu
    const request = {
      enrollmentPeriodId: this.admissions.id,
      templates: this.data
    };
    this.briefTemplateService.apiBriefTemplatePost(request)
    .subscribe((response) => {
      if (response.success) {
        this.showMsgSuccess('Cập nhật thành công?');
        this.onSaved.emit();
        this.loadBriefTemplates();
      } else {
        this.showMsgFailure('Cập nhật thất bại!')
      }
    });
  }
}
