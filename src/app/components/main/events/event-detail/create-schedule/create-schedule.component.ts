import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ScheduleType } from 'src/app/model/Schedule';
import { LocationService } from 'src/app/services/location.service';
import { first, distinctUntilChanged } from 'rxjs/operators';
import { Location } from 'src/app/model/Location';
import { Subscription } from 'rxjs';

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
  repeatMode = 'NONE';
  repeatModes = [ScheduleType.NONE, ScheduleType.DAILY, ScheduleType.WEEKLY];
  selectedLocation: Location = null;
  locations: Location[] = [];

  error: any;
  isLoading = false;
  dateTimePickerSettings = {
    bigBanner: true,
    timePicker: true
  };

  formStatusSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<CreateScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public eventId: tring,
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
  }

  ngOnDestroy() {
    if (this.formStatusSubscription && !this.formStatusSubscription.closed) {
      this.formStatusSubscription.unsubscribe();
    }
  }

  onSubmit() {
    console.log('Submit');
    const startDateTime = this.scheduleForm.controls.startDateTime.value as string;
    const endDateTime = this.scheduleForm.controls.endDateTime.value as string;
    const repeat = this.repeatMode;
    let location = null;
    if (this.selectedLocation != null) {
      location = this.selectedLocation.id;
    } else { return; }
    console.log('sending');

    this.isLoading = true;
    this.scheduleService.create(new Date(startDateTime), new Date(endDateTime), repeat, location, this.eventId).subscribe(() => {
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
    this.locationService.getAll().pipe(first()).subscribe(locations => {
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
