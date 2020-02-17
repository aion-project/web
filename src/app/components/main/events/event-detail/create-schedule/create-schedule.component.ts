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

export interface CreateScheduleData {
  eventId: string;
  schedules: Schedule[];
}

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit, OnDestroy {

  scheduleForm = new FormGroup({
    startDateTime: new FormControl('', Validators.required),
    endDateTime: new FormControl('', Validators.required),
  });
  untilForm = new FormControl();
  repeatMode = 'NONE';
  repeatModes = [ScheduleType.NONE, ScheduleType.DAILY, ScheduleType.WEEKLY];
  selectedLocation: Location = null;
  locations: Location[] = [];

  error: any;
  warning: any;
  isLoading = false;

  startDateSubscription: Subscription;
  formStatusSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<CreateScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateScheduleData,
    private scheduleService: ScheduleService,
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.formStatusSubscription = this.scheduleForm.statusChanges.pipe(distinctUntilChanged()).subscribe(status => {
      if (status === 'INVALID') {
        this.selectedLocation = null;
        this.locations = [];
      }
    });
    this.startDateSubscription = this.scheduleForm.controls.startDateTime.valueChanges.subscribe(event => {
      const confilct = this.data.schedules.find((schedule: Schedule) => {
        return moment(event).isBetween(moment(schedule.startDateTime), moment(schedule.until));
      });
      if (confilct) {
        this.warning = 'There are confilcts with current schedules. Procede with caution.';
      }

      let endDateTime = this.scheduleForm.controls.endDateTime.value as string;
      if (!endDateTime || endDateTime.length == 0) {
        this.scheduleForm.controls.endDateTime.setValue(moment(event).add(2, "hours").toISOString())
      }

      let until = this.untilForm.value as string;
      if (!until || until.length == 0) {
        this.untilForm.setValue(moment(event).add(1, "days").toISOString())
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
    const startDateTime = this.scheduleForm.controls.startDateTime.value as string;
    const endDateTime = this.scheduleForm.controls.endDateTime.value as string;
    const until = this.untilForm.value as string;
    const repeat = this.repeatMode;

    // Validations
    let location = null;
    if (this.selectedLocation != null) {
      location = this.selectedLocation.id;
    } else { return; }

    if (!moment(startDateTime).isBefore(endDateTime)) {
      this.error = "End date time should be after start date time"
      return;
    }

    if (repeat != 'NONE') {
      if (!until || until.length == 0) {
        this.error = "Must provide a until start of date to recurring dates"
        return;
      } else if (!moment(endDateTime).isBefore(until)) {
        this.error = "Until starting date should be after end date time"
        return;
      }
    }

    console.log('sending');

    this.isLoading = true;
    this.scheduleService.create(
      new Date(startDateTime),
      new Date(endDateTime),
      new Date(until),
      repeat,
      location,
      this.data.eventId
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
    const startDateTime = this.scheduleForm.controls.startDateTime.value as string;

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
