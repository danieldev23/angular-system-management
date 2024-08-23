import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { ComponentModule } from 'src/app/components/component.module';
import { MyMaterialModule } from 'src/app/material.module';
import { GuardLayoutComponent } from 'src/app/layouts/guard-layout/controller.component';
import { IndexGuardComponent } from './index-guard/controller.component';


@NgModule({
	declarations: [
		GuardLayoutComponent,
		IndexGuardComponent,

	],
	imports: [
		RoutingModule,
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		ComponentModule,
		MyMaterialModule
	],
})
export class GuardModule {}
