import { NgModule } from '@angular/core';
import { MyMaterialModule } from '../material.module';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MyPipeModule } from '../core/pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAdmissionPeriodsComponent } from './list-admission-periods/controller.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoutingModule } from '../modules/guard/routing.module';
import { Step1StructureComponent } from './step-1-structure/controller.component';
import { Step2BriefComponent } from './step-2-brief/controller.component';
import { Step3SetUpCouncilComponent } from './step-3-set-up-council/controller.component';
import { Step4MarkComponent } from './step-4-mark/controller.component';
import { Step5RecognizeStudentsComponent } from './step-5-recognize-students/controller.component';
import { Step6SummaryComponent } from './step-6-summary/controller.component';
import { BottomStepComponent } from './bottom-step/controller.component';
import { CreateAdmissionComponent } from './create-admission/controller.component';
import { CreateStudentProfileComponent } from './create-student-profile/controller.component';
import { CreateTeacherProfileComponent } from './create-teacher-profile/controller.component';

@NgModule({
  declarations: [
    ListAdmissionPeriodsComponent,
    Step1StructureComponent,
    Step2BriefComponent,
    Step3SetUpCouncilComponent,
    Step4MarkComponent,
    Step5RecognizeStudentsComponent,
    Step6SummaryComponent,
    BottomStepComponent,
    CreateAdmissionComponent,
    CreateStudentProfileComponent,
    CreateTeacherProfileComponent
  ],
  exports: [
    ListAdmissionPeriodsComponent,
    Step1StructureComponent,
    Step2BriefComponent,
    Step3SetUpCouncilComponent,
    Step4MarkComponent,
    Step5RecognizeStudentsComponent,
    Step6SummaryComponent,
    CreateAdmissionComponent,
    CreateStudentProfileComponent,
    CreateTeacherProfileComponent

  ],
  imports: [
    RoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    MyPipeModule,
    LucideAngularModule.pick(icons),
  ],
})
export class ComponentModule {}
