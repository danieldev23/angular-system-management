import {
  AdmissionProfile,
  BriefTemplate,
  BriefTemplateService,
  EnrollmentTeacher,
  EnrollmentTeacherService,
  ProfileBriefTemplate,
} from 'src/app/core/auto_api/backend';
// login/controller.component.ts

import { Component, Input } from '@angular/core';
import { MyBaseComponent } from '../../my-base.component';
import {
  AuthService,
  EnrollmentPeriod,
  EnrollmentPeriodService,
} from 'src/app/core/auto_api/backend';
import { ActivatedRoute } from '@angular/router';
import { PromiseMultipleTaskHelper } from 'src/app/core/promise-multiple-task-helper';
import { ProfileInfoService } from '../../../core/auto_api/backend/api/profileInfo.service';

@Component({
  selector: 'app-screen-set-up-council-admin-component',
  templateUrl: './template.component.html',
  styleUrls: ['./style.component.scss'],
})
export class SetUpCouncilAdminComponent extends MyBaseComponent {
  listAdmissions: EnrollmentPeriod[] = [];
  detailAdmissions?: EnrollmentPeriod;
  listPeriods: BriefTemplate[] = [];
  detailPeriod?: BriefTemplate;
  listAdmissionProfile: AdmissionProfile[] = [];
  listTeacherCreators: EnrollmentTeacher[] = [];
  isDisable: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private enrollmentPeriodService: EnrollmentPeriodService,
    private briefTemplateService: BriefTemplateService,
    private profileInfoService: ProfileInfoService,
    private enrollmentTeacherService: EnrollmentTeacherService,
  ) {
    super();
  }

  override ngOnInit(): void {
    console.log(`Detail admission: ${this.detailAdmissions?.currentStep}`);
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      const taskLoadFirstComponent = new PromiseMultipleTaskHelper(1);
      taskLoadFirstComponent.addTask(this, this.getAllAdmissions);
      taskLoadFirstComponent.addTask(this, this.getDetailAdmissions, [id]);
      taskLoadFirstComponent.addTask(this, this.getAllPeriods);
      taskLoadFirstComponent.addTask(this, this.getDetailPeriod, [id]);
      taskLoadFirstComponent.addTask(this, this.getProfileInfo, [id]);
      taskLoadFirstComponent.addTask(this, this.getAllTeacher, [id]);
      taskLoadFirstComponent.start();
    });
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

          this.removeMsgLoading();
          resolve();
        });
    });
  }

  private getAllTeacher(id: number): Promise<void> {
    return new Promise((resolve) => {
      this.enrollmentTeacherService
      .apiEnrollmentTeacherEnrollmentIdGet(id).subscribe((response) => {
          this.listTeacherCreators = response?.data ?? [];
          this.listTeacherCreators.map((value) => {
            console.log(value.fullName);
          });
      });
    });
  }
  private getDetailPeriod(id: number): Promise<void> {
    return new Promise((resolve) => {
      this.startMsgLoading('Đang tải chi tiết kỳ tuyển sinh');
      this.briefTemplateService
        .apiBriefTemplateLastTemplateGet()
        .subscribe((response) => {
          this.detailPeriod = response.data?.find((f) => f.id === id);
          this.removeMsgLoading();
          resolve();
        });
    });
  }
  private getAllPeriods(): Promise<void> {
    return new Promise((resolve) => {
      this.startMsgLoading('Đang tải danh sách hồ sơ học viên');
      this.briefTemplateService
        .apiBriefTemplateLastTemplateGet()
        .subscribe((response) => {
          this.listPeriods = response.data ?? [];

          this.removeMsgLoading();
          resolve();
        });
    });
  }

  private getProfileInfo(id: number): Promise<void> {
    return new Promise((resolve) => {
      // this.startMsgLoading('Đang tải thông tin hồ sơ học viên');
      this.profileInfoService
        .apiProfileInfoEnrollmentIdGet(id)
        .subscribe((response) => {
          this.listAdmissionProfile = response.data ?? [];
          // this.removeMsgLoading();
          resolve();
        });
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
