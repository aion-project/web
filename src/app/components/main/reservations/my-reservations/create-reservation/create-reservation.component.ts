import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ScheduleType, Schedule } from 'src/app/model/Schedule';
import { LocationService } from 'src/app/services/location.service';
import { first, distinctUntilChanged } from 'rxjs/operators';
import { Location } from 'src/app/model/Location';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit, OnDestroy {

  reservationForm = new FormGroup({
    event: new FormControl('', Validators.required),
    description: new FormControl(''),
    startDateTime: new FormControl('', Validators.required),
    endDateTime: new FormControl('', Validators.required),
  });
  selectedLocation: Location = null;
  locations: Location[] = [];

  error: any;
  warning: any;
  isLoading = false;
  dateTimePickerSettings = {
    bigBanner: true,
    timePicker: true
  };

  formStatusSubscription: Subscription;
  startDateSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<CreateReservationComponent>,
    private reservationService: ReservationService,
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.formStatusSubscription = this.reservationForm.statusChanges.pipe(distinctUntilChanged()).subscribe(status => {
      if (status === 'INVALID') {
        this.selectedLocation = null;
        this.locations = [];
      }
    });
    this.startDateSubscription = this.reservationForm.controls.startDateTime.valueChanges.subscribe(event => {
      const endDateTime = this.reservationForm.controls.endDateTime.value as string;
      if (!endDateTime || endDateTime.length === 0) {
        this.reservationForm.controls.endDateTime.setValue(moment(event).add(2, 'hours').toISOString());
      }

      this.selectedLocation = null;
      this.locations = [];
    });
  }

  ngOnDestroy() {
    if (this.formStatusSubscription && !this.formStatusSubscription.closed) {
      this.formStatusSubscription.unsubscribe();
    }
    if (this.startDateSubscription && !this.startDateSubscription.closed) {
      this.startDateSubscription.unsubscribe();
    }
  }

  onSubmit() {
    console.log('Submit');
    const event = this.reservationForm.controls.event.value as string;
    const description = this.reservationForm.controls.description.value as string;
    const startDateTime = this.reservationForm.controls.startDateTime.value as string;
    const endDateTime = this.reservationForm.controls.endDateTime.value as string;
    let location = null;
    if (this.selectedLocation != null) {
      location = this.selectedLocation.id;
    } else { return; }

    if (!moment(startDateTime).isBefore(endDateTime)) {
      this.error = 'End date time should be after start date time';
      return;
    }

    console.log('sending');

    this.isLoading = true;
    this.reservationService.create(
      event,
      description,
      new Date(startDateTime),
      new Date(endDateTime),
      location
    ).subscribe(() => {
      console.log('Success');
      this.isLoading = false;
      this.dialogRef.close(true);
    }, (err) => {
      if (err instanceof HttpErrorResponse && err.error.msg) {
        this.error = err.error.msg;
      } else {
        this.error = err.toString();
      }
      console.log(err);
      this.isLoading = false;
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onCheckLocations() {
    this.locations = [];
    const startDateTime = this.reservationForm.controls.startDateTime.value as string;

    this.locationService.getAvailable(new Date(startDateTime)).pipe(first()).subscribe(locations => {
      this.locations = locations;
    });
  }

  onLocationSelected(location) {
    this.selectedLocation = location;
  }

  onLocationRemoved() {
    this.selectedLocation = null;
  }

}
