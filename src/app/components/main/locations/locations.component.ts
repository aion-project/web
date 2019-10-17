import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { LocationCreateEditComponent } from './location-create-edit/location-create-edit.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  isAdmin: boolean

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.myRoles().pipe(first()).subscribe((roles: any[]) => {
      if (roles.some(role => role.name == "admin"))
        this.isAdmin = true
    })
  }

}
