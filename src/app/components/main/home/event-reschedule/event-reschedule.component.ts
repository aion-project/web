import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventCreateEditComponent } from '../../events/event-create-edit/event-create-edit.component';
import { EventService } from 'src/app/services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-event-reschedule',
  templateUrl: './event-reschedule.component.html',
  styleUrls: ['./event-reschedule.component.scss']
})
export class EventRescheduleComponent implements OnInit {

  changeMode = 'TEMP';

  newDateForm = new FormGroup({
    startDateTime: new FormControl(''),
    endDateTime: new FormControl(''),
  });

  error: any;
  isLoading = false;
  rescheduleModes = [ {key: 'TEMP', value: 'Temporary'}, {key: 'PERM', value: 'Permanant'} ];

  constructor(
    public dialogRef: MatDialogRef<EventCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public event,
    private scheduleService: ScheduleService,
  ) { }

  ngOnInit() {
    console.log('Event', this.event);
    this.newDateForm.setValue({
      startDateTime: this.event.event.start,
      endDateTime: this.event.event.end
    });
  }

  onSubmit() {
    const oldDate = this.event.oldEvent.start;
    const newDate = this.event.event.start;
    const type = this.changeMode;

    this.isLoading = true;
    this.scheduleService.reschedule(this.event.event.groupId, this.event.event.id, oldDate, newDate, type).subscribe(() => {
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

}
