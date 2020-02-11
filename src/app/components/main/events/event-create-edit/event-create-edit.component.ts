import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../../../model/Event';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-create-edit.component.html',
  styleUrls: ['./event-create-edit.component.scss']
})
export class EventCreateEditComponent implements OnInit {

  eventForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  error: any;
  isEditing = false;
  isLoading = false;
  event: Event;
  dateTimePickerSettings = {
    bigBanner: true,
    timePicker: true
  };

  constructor(
    public dialogRef: MatDialogRef<EventCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public eventId: string,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.isEditing = this.eventId != null;
    if (this.isEditing) {
      this.eventService.get(this.eventId).subscribe((res: any) => {
        this.event = res as Event;
        this.eventForm.setValue({
          name: this.event.name,
          description: this.event.description
        });
      });
    }
  }

  onSubmit() {
    const name = this.eventForm.controls.name.value as string;
    const description = this.eventForm.controls.description.value as string;

    this.isLoading = true;
    let submitObservable: Observable<any>;
    if (this.isEditing) {
      submitObservable = this.eventService.update(this.eventId, name, description);
    } else {
      submitObservable = this.eventService.create(name, description);
    }
    submitObservable.subscribe(() => {
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
