import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { OktaAuthModule } from '@okta/okta-angular';
import { AppRoutingModule, ScreenComponents, DialogComponents } from './app-routing.module';
import { MaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
4
import { AppConfig } from './config/app-config';
import { UnactiveGuard } from './auth/unactive.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoginGuard } from './auth/login.guard';
import { AdminGuard } from './auth/admin.guard';
import { LoaderComponent } from './components/common/loader/loader.component';

export const CommonComponents = [
  LoaderComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ScreenComponents,
    DialogComponents,
    CommonComponents,
  ],
  entryComponents: [
    DialogComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    OktaAuthModule.initAuth(AppConfig.OKTA_CLIENT_CONFIG),
  ],
  providers: [
    UnactiveGuard,
    LoginGuard,
    AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
