import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './auth/login.guard';
import { AuthGuard } from './auth/auth.guard';
import { UsersComponent } from './components/main/users/users.component';
import { HomeComponent } from './components/main/home/home.component';
import { UserDetailComponent } from './components/main/users/user-detail/user-detail.component';
import { ProfileComponent } from './components/main/profile/profile.component';

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: "", component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: "users", component: UsersComponent },
      { path: "users/:userId", component: UserDetailComponent },
      { path: "profile", component: ProfileComponent },
      { path: "home", component: HomeComponent },
      { path: "", redirectTo:"/home", pathMatch: "full"}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
