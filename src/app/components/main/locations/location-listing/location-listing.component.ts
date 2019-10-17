import { Component, OnInit } from '@angular/core';
import { LocationCreateEditComponent } from '../location-create-edit/location-create-edit.component';
import { MatDialog } from '@angular/material';
import { LocationService } from 'src/app/services/location.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-location-listing',
  templateUrl: './location-listing.component.html',
  styleUrls: ['./location-listing.component.scss']
})
export class LocationListingComponent implements OnInit {

  isAdmin: Boolean
  displayedColumns: string[] = ['name', 'level', 'description']
  displayedData: any

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private locationService: LocationService,
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
