import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent, OktaLoginRedirectComponent } from '@okta/okta-angular';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersComponent } from './components/main/users/users.component';
import { HomeComponent } from './components/main/home/home.component';
import { UserDetailComponent } from './components/main/users/user-detail/user-detail.component';
import { SelectRoleComponent } from './components/main/users/user-detail/select-role/select-role.component';
import { ProfileComponent } from './components/main/profile/profile.component';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { UsersEditComponent } from './components/main/users/users-edit/users-edit.component';
import { UsersCreateComponent } from './components/main/users/users-create/users-create.component';
import { AvatarUploadComponent } from './components/main/users/user-detail/avatar-upload/avatar-upload.component';
import { AppConfig } from './config/app-config';
import { ActiveGuard } from './auth/active.guard';
import { UnactiveGuard } from './auth/unactive.guard';
import { ActivateComponent } from './components/activate/activate.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ChangePasswordComponent } from './components/main/profile/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';
import { LocationsComponent } from './components/main/locations/locations.component';


@NgModule({
  declarations: [
    AppComponent,
    ActivateComponent,
    MainComponent,
    LoginComponent,
    UsersComponent,
    UserDetailComponent,
    HomeComponent,
    SelectRoleComponent,
    ConfirmDialogComponent,
    ProfileComponent,
    UsersEditComponent,
    UsersCreateComponent,
    AvatarUploadComponent,
    ChangePasswordComponent,
    LocationsComponent,
  ],
  entryComponents: [
    SelectRoleComponent,
    ConfirmDialogComponent,
    UsersEditComponent,
    UsersCreateComponent,
    AvatarUploadComponent,
    ChangePasswordComponent,
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
    ActiveGuard,
    UnactiveGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
