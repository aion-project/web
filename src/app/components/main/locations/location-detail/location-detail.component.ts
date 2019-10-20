import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';
import { LocationService } from 'src/app/services/location.service';
import { LocationCreateEditComponent } from '../location-create-edit/location-create-edit.component';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {

  private locationId: String

  location: Location
  isAdmin: boolean = false

  constructor(
    private userService: UserService,
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.userService.isRole("admin").pipe(first()).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin
    })
    this.activatedRoute.paramMap.pipe(first()).subscribe((map) => {
      this.locationId = map.get("locationId")
      this.fetchLocationInfo()
    })
  }

  onEditLocation() {
    const dialogRef = this.dialog.open(LocationCreateEditComponent, {
      width: '640px',
      data: this.locationId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchLocationInfo();
      }
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.delete(this.locationId).toPromise().then(_ => {
          this.router.navigateByUrl("/locations")
        })
      }
    });
  }

  fetchLocationInfo() {
    this.locationService.get(this.locationId).pipe(first()).subscribe(location => {
      this.location = location
    })
  }
}
