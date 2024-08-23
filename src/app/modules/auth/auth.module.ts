import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { ComponentModule } from 'src/app/components/component.module';
import { MyMaterialModule } from 'src/app/material.module';
import { LucideAngularModule, icons } from 'lucide-angular';
import { LoginAuthComponent } from './login/login.component';
import { MyPipeModule } from 'src/app/core/pipes/pipe.module';
import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/controller.component';

@NgModule({
	declarations: [
		AuthLayoutComponent,
    LoginAuthComponent
	],
	imports: [
		RoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    MyMaterialModule,
    MyPipeModule,
    LucideAngularModule.pick(icons),
	],
})
export class AuthModule {}
