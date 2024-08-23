import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardLayoutComponent } from 'src/app/layouts/guard-layout/controller.component';
import { IndexGuardComponent } from './index-guard/controller.component';

const routes: Routes = [
	{
		path: '',
		component: GuardLayoutComponent,
		children: [
			{
				path: '',
				component: IndexGuardComponent
			}
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RoutingModule {}
