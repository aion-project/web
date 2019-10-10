import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LocationService } from 'src/app/services/location.service';
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
  currentUser: any
  displayedColumns: string[] = ['name', 'level', 'description']
  displayedData: any

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.userService.myRoles().pipe(first()).subscribe((roles: any[]) => {
      if (roles.some(role => role.name == "admin"))
        this.isAdmin = true
    })
    this.fetchLocations()
  }

  create() {
    const dialogRef = this.dialog.open(LocationCreateEditComponent, {
      width: '640px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchLocations();
      }
    });
  }

  fetchLocations() {
    this.locationService.getAll().pipe(first()).subscribe(locations => {
      this.displayedData = locations
    })
  }
}
