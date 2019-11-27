import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Event, EventType } from "../../../../model/Event";

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-create-edit.component.html',
  styleUrls: ['./event-create-edit.component.scss']
})
export class EventCreateEditComponent implements OnInit {

  eventForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    startDateTime:  new FormControl(''),
    endDateTime: new FormControl(''),
  })

  error: any
  isEditing: boolean = false
  isLoading: boolean = false
  event: Event
  dateTimePickerSettings = {
		bigBanner: true,
		timePicker: true
	}

  constructor(
    public dialogRef: MatDialogRef<EventCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public eventId: String,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.isEditing = this.eventId != null
    if (this.isEditing) {
      this.eventService.get(this.eventId).subscribe((res: any) => {
        this.event = res as Event
        this.eventForm.setValue({
          name: this.event.name,
          description: this.event.description,
          startDateTime: this.event.startDateTime,
          endDateTime: this.event.endDateTime,
        })
      })
    }
  }

  onSubmit() {
    let name = this.eventForm.controls['name'].value as string;
    let description = this.eventForm.controls['description'].value as string;
    let startDateTime = this.eventForm.controls['startDateTime'].value as string;
    let endDateTime = this.eventForm.controls['endDateTime'].value as string;

    this.isLoading = true
    var submitObservable: Observable<any>
    if (this.isEditing) {
      submitObservable = this.eventService.update(this.eventId, name, description, new Date(startDateTime), new Date(endDateTime), EventType.NONE);
    } else {
      submitObservable = this.eventService.create(name, description, new Date(startDateTime), new Date(endDateTime), EventType.NONE);

    }
    submitObservable.subscribe(() => {
      this.isLoading = false
      this.dialogRef.close(true)
    }, (err) => {
      if (err instanceof HttpErrorResponse && err.error.msg) {
        this.error = err.error.msg
      } else {
        this.error = err.toString()
      }
      console.log(err);
      this.isLoading = false
    })
  }

  onCancel() {
    this.dialogRef.close()
  }

}
