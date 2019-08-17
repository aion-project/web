import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './auth/login.guard';
import { AuthGuard } from './auth/auth.guard';
import { UsersComponent } from './components/main/users/users.component';
import { HomeComponent } from './components/main/home/home.component';
import { UserDetailComponent } from './components/main/users/user-detail/user-detail.component';

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: "", component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: "users", component: UsersComponent },
      { path: "user/:userId", component: UserDetailComponent },
      { path: "", component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
