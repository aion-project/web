import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Resource } from 'src/app/model/Resource';
import { ResourceService } from 'src/app/services/resource.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resource-create-edit',
  templateUrl: './resource-create-edit.component.html',
  styleUrls: ['./resource-create-edit.component.scss']
})
export class ResourceCreateEditComponent implements OnInit {

  resourceForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  error: any;
  isEditing = false;
  isLoading = false;
  resource: Resource;

  constructor(
    public dialogRef: MatDialogRef<ResourceCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public resourceId: string,
    private resourceService: ResourceService,
  ) { }

  ngOnInit() {
    this.isEditing = this.resourceId != null;
    if (this.isEditing) {
      this.resourceService.get(this.resourceId).subscribe((res: any) => {
        this.resource = res as Resource;
        this.resourceForm.setValue({
          name: this.resource.name,
          description: this.resource.description,
        });
      });
    }
  }

  onSubmit() {
    const name = this.resourceForm.controls.name.value as string;
    const description = this.resourceForm.controls.description.value as string;
    this.isLoading = true;
    let submitObservable: Observable<any>;
    if (this.isEditing) {
      submitObservable = this.resourceService.update(this.resourceId, name, description);
    } else {
      submitObservable = this.resourceService.create(name, description);
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
