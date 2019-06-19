import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
import { httpInterceptorProviders } from './auth/auth.interceptor';
import { UsersComponent } from './components/main/users/users.component';
import { HomeComponent } from './components/main/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    UsersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    // httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
