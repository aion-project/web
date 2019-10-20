import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { UsersComponent } from './components/main/users/users.component';
import { HomeComponent } from './components/main/home/home.component';
import { UserDetailComponent } from './components/main/users/user-detail/user-detail.component';
import { ProfileComponent } from './components/main/profile/profile.component';
import { ActivateComponent } from './components/activate/activate.component';
import { UnactiveGuard } from './auth/unactive.guard';
import { OktaAuthGuard, OktaCallbackComponent, OktaLoginRedirectComponent } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { LocationsComponent } from './components/main/locations/locations.component';
import { LocationDetailComponent } from './components/main/locations/location-detail/location-detail.component';
import { ResourcesComponent } from './components/main/locations/resources/resources.component';
import { LocationListingComponent } from './components/main/locations/location-listing/location-listing.component';
import { UserListingComponent } from './components/main/users/user-listing/user-listing.component';
import { LoginGuard } from './auth/login.guard';
import { AdminGuard } from './auth/admin.guard';

export function onAuthRequired({ oktaAuth, router }) {
  router.navigate(['/login']);
}

const routes: Routes = [
  { path: "implicit/callback", component: OktaCallbackComponent },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "activate", component: ActivateComponent, canActivate: [UnactiveGuard] },
  {
    path: "", component: MainComponent, canActivate: [OktaAuthGuard],
    data: { onAuthRequired },
    children: [
      {
        path: "users", component: UsersComponent, children: [
          { path: "listing/:userId", component: UserDetailComponent },
          { path: "listing", component: UserListingComponent },
          { path: "", pathMatch: "full", redirectTo: "listing" },
        ]
      },
      {
        path: "locations", component: LocationsComponent, children: [
          { path: "resources", component: ResourcesComponent, canActivate: [AdminGuard] },
          { path: "listing/:locationId", component: LocationDetailComponent },
          { path: "listing", component: LocationListingComponent },
          { path: "", pathMatch: "full", redirectTo: "listing" },
        ]
      },
      { path: "resources", component: ResourcesComponent },
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
