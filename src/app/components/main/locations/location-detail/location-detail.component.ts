import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';
import { LocationService } from 'src/app/services/location.service';
import { LocationCreateEditComponent } from '../location-create-edit/location-create-edit.component';
import { SelectElementComponent, SelectElementType } from 'src/app/components/common/select-element/select-element.component';
import { Location } from "../../../../model/Location";
import { Event } from 'src/app/model/Event';
import * as moment from 'moment';
import * as DateUtil from 'src/app/utils/date-util';
import { CheckAvailabilityComponent } from 'src/app/components/common/check-availability/check-availability.component';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {

  private locationId: String

  location: Location
  events: Event[]
  currentEvents: Event[]
  isAdmin: boolean = false

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.userService.isRole("admin").pipe(first()).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin
    })
    this.activatedRoute.paramMap.pipe(first()).subscribe((map) => {
      this.locationId = map.get("locationId")
      this.fetchLocationInfo()
      this.fetchEvents()
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

  onResourceAdd() {
    const dialogRef = this.dialog.open(SelectElementComponent, {
      width: '640px',
      data: { type: SelectElementType.RESOURCE, current: this.location.resources }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.addResource(this.locationId, result).toPromise().then(_ => {
          this.fetchLocationInfo()
        })
      }
    });
  }

  onResourceRemove(resourceId) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.removeUser(this.locationId, resourceId).toPromise().then(_ => {
          this.fetchLocationInfo()
        });
      }
    });
  }

  onCheckAvailability() {
    this.dialog.open(CheckAvailabilityComponent, {
      width: '640px',
      data: { events: this.events }
    });
  }

  fetchLocationInfo() {
    this.locationService.get(this.locationId).pipe(first()).subscribe(location => {
      this.location = location
    })
  }

  fetchEvents() {
    this.locationService.getEvents(this.locationId).pipe(first()).subscribe(events => {
      this.events = events
      this.currentEvents = DateUtil.getEventAt(events, moment(Date.now()).toISOString(true));
      console.log(this.currentEvents)
    })
  }

}
