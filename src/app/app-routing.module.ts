import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { UsersComponent } from './components/main/users/users.component';
import { HomeComponent } from './components/main/home/home.component';
import { UserDetailComponent } from './components/main/users/user-detail/user-detail.component';
import { ProfileComponent } from './components/main/profile/profile.component';
import { ActiveGuard } from './auth/active.guard';
import { ActivateComponent } from './components/activate/activate.component';
import { UnactiveGuard } from './auth/unactive.guard';
import { OktaAuthGuard, OktaCallbackComponent, OktaLoginRedirectComponent } from '@okta/okta-angular';

const routes: Routes = [
  { path: "implicit/callback", component: OktaCallbackComponent },
  { path: "login", component: OktaLoginRedirectComponent },
  { path: "activate", component: ActivateComponent, canActivate: [UnactiveGuard] },
  {
    path: "", component: MainComponent, canActivate: [OktaAuthGuard, ActiveGuard],
    children: [
      { path: "users/:userId", component: UserDetailComponent },
      { path: "users", component: UsersComponent },
      { path: "profile", component: ProfileComponent },
      { path: "home", component: HomeComponent },
      { path: "", redirectTo: "/home", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
