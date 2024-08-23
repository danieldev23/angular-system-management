import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { MyMaterialModule } from 'src/app/material.module';
import { LucideAngularModule, icons } from 'lucide-angular';
import { MyPipeModule } from 'src/app/core/pipes/pipe.module';
import { ComponentModule } from 'src/app/components/component.module';
import { IndexAdminComponent } from './index-admin/controller.component';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/controller.component';
import { AdmissionsAdminComponent } from './admissions-admin/controller.component';
import { StudentProfileAdminComponent } from './student-profile-admin/controller.component';
import { ResearchAdminComponent } from './research-admin/controller.component';
import { AdmissionsDetailAdminComponent } from './admissions-detail-admin/controller.component';
import { SetUpCouncilAdminComponent } from './set-up-council-admin/controller.component';
import { MarkAdminComponent } from './mark-admin/controller.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    IndexAdminComponent,
    AdmissionsAdminComponent,
    StudentProfileAdminComponent,
    ResearchAdminComponent,
    AdmissionsDetailAdminComponent,
    SetUpCouncilAdminComponent,
    MarkAdminComponent
  ],
  imports: [
    ComponentModule,
    RoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    MyPipeModule,
    LucideAngularModule.pick(icons),
  ],
  exports: [
    AdminLayoutComponent,
    IndexAdminComponent,
    AdmissionsAdminComponent,
    StudentProfileAdminComponent,
    ResearchAdminComponent,
    AdmissionsDetailAdminComponent,
    SetUpCouncilAdminComponent,
    MarkAdminComponent
  ],
})
export class AdminModule {}
