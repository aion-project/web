import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/model/Location';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-edit',
  templateUrl: './location-create-edit.component.html',
  styleUrls: ['./location-create-edit.component.scss']
})
export class LocationCreateEditComponent implements OnInit {

  locationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
    description: new FormControl(''),
    quantity: new FormControl(0, Validators.required),
    ac: new FormControl(false),
  });

  error: any;
  isEditing = false;
  isLoading = false;
  location: Location;

  constructor(
    public dialogRef: MatDialogRef<LocationCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public locationId: string,
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.isEditing = this.locationId != null;
    if (this.isEditing) {
      this.locationService.get(this.locationId).subscribe((res: any) => {
        this.location = res as Location;
        this.locationForm.setValue({
          name: this.location.name,
          level: this.location.level,
          description: this.location.description,
          quantity: this.location.quantity,
          ac: this.location.ac
        });
      });
    }
  }

  onSubmit() {
    if (this.locationForm.invalid)
      return;

    const name = this.locationForm.controls.name.value as string;
    const level = this.locationForm.controls.level.value as string;
    const description = this.locationForm.controls.description.value as string;
    const quantity = this.locationForm.controls.quantity.value as number;
    const ac = this.locationForm.controls.ac.value as boolean;
    this.isLoading = true;
    let submitObservable: Observable<any>;
    if (this.isEditing) {
      submitObservable = this.locationService.update(this.locationId, name, level, description, quantity, ac);
    } else {
      submitObservable = this.locationService.create(name, level, description, quantity, ac);

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
