import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ApiModule as ApiBackendModule,
  BASE_PATH,
} from './core/auto_api/backend';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ResponseInterceptor } from './core/interceptors/response_interceptor';
import { TokenInterceptor } from './core/interceptors/token_interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './material.module';
import { ComponentModule } from './components/component.module';
import { LucideAngularModule, icons } from 'lucide-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ApiBackendModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    ComponentModule,
    LucideAngularModule.pick(icons),
    NgbModule,
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.auto_base_backend_api },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
