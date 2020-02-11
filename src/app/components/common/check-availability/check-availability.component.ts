import { Component, OnInit, Inject } from '@angular/core';
import { Event } from 'src/app/model/Event';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { distinctUntilChanged } from 'rxjs/operators';
import * as DateUtil from 'src/app/utils/date-util';

export interface CheckAvailabilityData {
  events: Event[];
}

@Component({
  selector: 'app-check-availability',
  templateUrl: './check-availability.component.html',
  styleUrls: ['./check-availability.component.scss']
})
export class CheckAvailabilityComponent implements OnInit {

  date = new FormControl(moment(Date.now()).toISOString(true));
  currentEvents: Event[];

  constructor(
    public dialogRef: MatDialogRef<CheckAvailabilityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CheckAvailabilityData,
  ) { }

  ngOnInit() {
    this.date.valueChanges.pipe(distinctUntilChanged()).subscribe(date => {
      this.fetchCurrentEvents(date);
    });
    this.fetchCurrentEvents(moment(Date.now()).toISOString(true));
  }

  onCancel() {
    this.dialogRef.close();
  }

  fetchCurrentEvents(date: string) {
    this.currentEvents = DateUtil.getEventAt(this.data.events, moment(date).toISOString(true));

  }
}
