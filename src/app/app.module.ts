import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
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

export function getToken() {
  return localStorage.getItem('token')
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ActivateComponent,
    MainComponent,
    UsersComponent,
    UserDetailComponent,
    HomeComponent,
    SelectRoleComponent,
    ConfirmDialogComponent,
    ProfileComponent,
    UsersEditComponent,
    UsersCreateComponent,
    AvatarUploadComponent,
  ],
  entryComponents: [
    SelectRoleComponent,
    ConfirmDialogComponent,
    UsersEditComponent,
    UsersCreateComponent,
    AvatarUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [AppConfig.AUTH0_WHITELIST_BASE_URL]
      }
    }),
    MaterialModule
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    ActiveGuard,
    UnactiveGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
