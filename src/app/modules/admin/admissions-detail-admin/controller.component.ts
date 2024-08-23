import { Component } from '@angular/core';
import { MyBaseComponent } from '../../my-base.component';
import {
  EnrollmentPeriod,
  EnrollmentPeriodService,
  BriefTemplate,
  BriefTemplateService,
  ProfileInfoService,
  ProfileBriefTemplate,
  AdmissionProfile,
  EnrollmentTeacher,
} from 'src/app/core/auto_api/backend';
import { ActivatedRoute } from '@angular/router';
import { PromiseMultipleTaskHelper } from 'src/app/core/promise-multiple-task-helper';

@Component({
  selector: 'app-screen-admissions-detail-admin-component',
  templateUrl: './template.component.html',
  styleUrls: ['./style.component.scss'],
})
export class AdmissionsDetailAdminComponent extends MyBaseComponent {
  listAdmissions: EnrollmentPeriod[] = [];
  detailAdmissions?: EnrollmentPeriod;
  profileInfo: ProfileBriefTemplate[] = [];
  listPeriods: BriefTemplate[] = [];
  detailPeriod?: BriefTemplate;
  listAdmissionProfile: AdmissionProfile[] = [];
  listTeacherCreators: EnrollmentTeacher[] = [];


  isDisable: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private enrollmentPeriodService: EnrollmentPeriodService,
    private briefTemplateService: BriefTemplateService,
    private profileInfoService: ProfileInfoService
  ) {
    super();
  }

  override ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      const taskLoadFirstComponent = new PromiseMultipleTaskHelper(1);
      taskLoadFirstComponent.addTask(this, this.getAllAdmissions);
      taskLoadFirstComponent.addTask(this, this.getDetailAdmissions, [id]);
      taskLoadFirstComponent.addTask(this, this.getAllPeriods);
      taskLoadFirstComponent.addTask(this, this.getDetailPeriod, [id]);
      taskLoadFirstComponent.addTask(this, this.getProfileInfo, [id]);
      taskLoadFirstComponent.start();
    });
    console.log('Current step: ', this.detailAdmissions);
  }

  private getAllAdmissions(): Promise<void> {
    return new Promise((resolve) => {
      this.startMsgLoading('Đang tải danh sách các kỳ tuyển sinh');
      this.enrollmentPeriodService
        .apiEnrollmentPeriodGet()
        .subscribe((response) => {
          this.listAdmissions = response.data ?? [];
          
          this.removeMsgLoading();
          resolve();
        });
    });
  }

  private getDetailAdmissions(id: number): Promise<void> {
    return new Promise((resolve) => {
      this.startMsgLoading('Đang tải chi tiết kỳ tuyển sinh');
      this.enrollmentPeriodService
        .apiEnrollmentPeriodIdGet(id)
        .subscribe((response) => {
          this.detailAdmissions = response.data;
          console.table(response);

          this.removeMsgLoading();
          resolve();
        });
    });
  }
  private getDetailPeriod(id: number): Promise<void> {
    return new Promise((resolve) => {
      this.startMsgLoading('Đang tải chi tiết kỳ tuyển sinh');
      this.briefTemplateService
        .apiBriefTemplateLastTemplateGet(id)
        .subscribe((response) => {
          this.detailPeriod = response.data?.find((f) => f.id === id);
          this.removeMsgLoading();
          resolve();
        });
    });
  }
  private getAllPeriods(): Promise<void> {
    return new Promise((resolve) => {
      this.startMsgLoading('Đang tải danh sách các kỳ tuyển sinh');
      this.briefTemplateService
        .apiBriefTemplateDefaultTemplateGet()
        .subscribe((response) => {
          this.listPeriods = response.data ?? [];
          console.log(`Response from getAllPeriods: ${JSON.stringify(response.data)}`);
          
          this.removeMsgLoading();
          resolve();
        });
    });
  }
  
  private getProfileInfo(id: number): Promise<void>{
    return new Promise((resolve) => {
      // this.startMsgLoading('Đang tải thông tin hồ sơ học viên');
      this.profileInfoService.apiProfileInfoEnrollmentIdGet(id).subscribe((response) => {
        this.listAdmissionProfile = response.data ?? [];
        this.listAdmissionProfile.map((profile) => {
          console.log(profile);
        })
          resolve();
      })
    });
     
  }

  checkActiveStep(name: string): boolean {
    const stepByStep: string[] = [
      'int',
      'receive_documents',
      'up_a_council',
      'mark',
      'recognize_students',
      'done',
    ];
    const checkIdx = stepByStep.findIndex((f) => f === name);
    const currentIdx = stepByStep.findIndex(
      (f) => f === this.detailAdmissions?.currentStep ?? ''
    );
    return checkIdx <= currentIdx;
  }
}
