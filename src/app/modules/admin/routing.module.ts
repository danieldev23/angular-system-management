import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/controller.component';
import { IndexAdminComponent } from './index-admin/controller.component';
import { AdmissionsAdminComponent } from './admissions-admin/controller.component';
import { StudentProfileAdminComponent } from './student-profile-admin/controller.component';
import { ResearchAdminComponent } from './research-admin/controller.component';
import { AdmissionsDetailAdminComponent } from './admissions-detail-admin/controller.component';
import { SetUpCouncilAdminComponent } from './set-up-council-admin/controller.component';
import { MarkAdminComponent } from './mark-admin/controller.component';
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    data: { title: 'Trang quản trị' },
    children: [
      
      {
        path: 'dashboard',
        component: IndexAdminComponent,
        data: { title: 'Trang quản trị' }
      },
      {
        path: 'ky-tuyen-sinh',
        component: AdmissionsAdminComponent,
        data: { title: 'Kỳ tuyển sinh' }
      },
      {
        path: 'ky-tuyen-sinh/:id',
        component: AdmissionsDetailAdminComponent,
        data: { title: 'Kỳ tuyển sinh' }
      },
      {
        path: 'ho-so-hoc-vien/ky-tuyen-sinh/:id',
        component: StudentProfileAdminComponent,
        data: { title: 'Hồ sơ học viên' }
      },
      {
        path: 'lap-hoi-dong/ky-tuyen-sinh/:id',
        component: SetUpCouncilAdminComponent,
        data: {title: 'Lập hội đồng chấm thi'}
      },
      {
        path: 'cham-diem/ky-tuyen-sinh/:id',
        component: MarkAdminComponent,
        data: { title: 'Chấm điểm'}
      },
      {
        path: 'de-tai-nghien-cuu',
        component: ResearchAdminComponent,
        data: { title: 'Đề tài nghiên cứu' }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
