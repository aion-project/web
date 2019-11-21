import { ResourceDetailComponent } from './components/main/locations/resources/resource-detail/resource-detail.component';
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
import { LoaderComponent } from './components/common/loader/loader.component';
import { SelectRoleComponent } from './components/main/users/user-detail/select-role/select-role.component';
import { ConfirmDialogComponent } from './components/common/confirm-dialog/confirm-dialog.component';
import { UsersEditComponent } from './components/main/users/users-edit/users-edit.component';
import { UsersCreateComponent } from './components/main/users/users-create/users-create.component';
import { AvatarUploadComponent } from './components/main/users/user-detail/avatar-upload/avatar-upload.component';
import { ChangePasswordComponent } from './components/main/profile/change-password/change-password.component';
import { LocationCreateEditComponent } from './components/main/locations/location-create-edit/location-create-edit.component';
import { ResourceCreateEditComponent } from './components/main/locations/resources/resource-create-edit/resource-create-edit.component';
import { SelectResourceComponent } from './components/main/locations/location-detail/select-resource/select-resource.component';
import { GroupsComponent } from './components/main/users/groups/groups.component';
import { GroupCreateEditComponent } from './components/main/users/groups/group-create-edit/group-create-edit.component';
import { GroupDetailComponent } from './components/main/users/groups/group-detail/group-detail.component';

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
          { path: "groups/:groupId", component: GroupDetailComponent },
          { path: "groups", component: GroupsComponent },
          { path: "listing/:userId", component: UserDetailComponent },
          { path: "listing", component: UserListingComponent },
          { path: "", pathMatch: "full", redirectTo: "listing" },
        ]
      },
      {
        path: "locations", component: LocationsComponent, children: [
          { path: "resources/:resourceId", component: ResourceDetailComponent },
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

export const ScreenComponents = [
  ActivateComponent,
  MainComponent,
  LoginComponent,
  UsersComponent,
  UserDetailComponent,
  HomeComponent,
  ProfileComponent,
  UserListingComponent,
  LocationsComponent,
  LocationListingComponent,
  LocationDetailComponent,
  ResourcesComponent,
  ResourceDetailComponent,
  GroupsComponent,
  GroupDetailComponent,
];

export const DialogComponents = [
  SelectRoleComponent,
  ConfirmDialogComponent,
  UsersEditComponent,
  UsersCreateComponent,
  AvatarUploadComponent,
  ChangePasswordComponent,
  LocationCreateEditComponent,
  ResourceCreateEditComponent,
  SelectResourceComponent,
  GroupCreateEditComponent,
];