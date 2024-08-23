import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  AdmissionProfile,
  EnrollmentPeriod,
  EnrollmentTeacher,
  EnrollmentTeacherService,
} from 'src/app/core/auto_api/backend';
import { PromiseMultipleTaskHelper } from 'src/app/core/promise-multiple-task-helper';
import { MyBaseComponent } from 'src/app/modules/my-base.component';

@Component({
  selector: 'app-step-4-mark-component',
  templateUrl: './template.component.html',
})
export class Step4MarkComponent extends MyBaseComponent {
  @Input({ required: true }) admissions!: EnrollmentPeriod;
  @Input({ required: true }) admissionProfiles: AdmissionProfile[] = [];
  @Input({ required: true }) listTeachers: EnrollmentTeacher[] = [];
  @ViewChildren('pointInput')
  pointInputs!: QueryList<ElementRef>;
  isActive: boolean = false;
  showMark: boolean = true;
  mark: boolean = false;
  selectedStudent: any = null;
  constructor(private enrollmentTeacherService: EnrollmentTeacherService) {
    super();
  }

  onMark() {
    this.showMark = !this.showMark;
    this.mark = !this.mark;
  }
  selectStudent(student: any) {
    this.isActive = true;
    this.selectedStudent = student;
    console.log(student);
  }
  savePoints() {
    let id = this.admissions.id;
    const taskHelper = new PromiseMultipleTaskHelper(1);
    console.log(this.selectedStudent.id);
    this.pointInputs.forEach((input, index) => {
      const point = Number((input.nativeElement as HTMLInputElement).value);
      const payload = {
        profileId: this.selectedStudent.id,
        teacherId: this.listTeachers[index].id,
        point: point,
      };
      this.enrollmentTeacherService
        .apiEnrollmentTeacherEnrollmentIdPointPost(Number(id), payload)
        .subscribe((response) => {
          if (response.data) {
            this.showMsgSuccess('Lưu điểm thành công!');
          }
        });
      // Add the task to the taskHelper
      // taskHelper.addTask(this, this.markPoint, [(Number(id), payload)]);
    });

    taskHelper.start();
  }

  calculateAveragePoint(admissionProfile: any): number {
    if (
      !admissionProfile.admissionPointTeachers ||
      admissionProfile.admissionPointTeachers.length === 0
    ) {
      return 0;
    }

    const totalPoints = admissionProfile.admissionPointTeachers.reduce(
      (sum: any, teacher: { point: any }) => sum + teacher.point,
      0
    );
    return totalPoints / admissionProfile.admissionPointTeachers.length;
  }

  markPoint(id: number, payload: any): Promise<any> {
    return new Promise((resolve) => {
      this.enrollmentTeacherService
        .apiEnrollmentTeacherEnrollmentIdPointPost(id, payload)
        .subscribe((response) => {
          console.log(response.data);
        });
    });
  }
}
