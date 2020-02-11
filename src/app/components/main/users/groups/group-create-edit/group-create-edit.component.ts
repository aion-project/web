import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/model/Group';

@Component({
  selector: 'app-group-create-edit',
  templateUrl: './group-create-edit.component.html',
  styleUrls: ['./group-create-edit.component.scss']
})
export class GroupCreateEditComponent implements OnInit {

  groupForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  error: any;
  isEditing = false;
  isLoading = false;
  group: Group;

  constructor(
    public dialogRef: MatDialogRef<GroupCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public groupId: string,
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    this.isEditing = this.groupId != null;
    if (this.isEditing) {
      this.groupService.get(this.groupId).subscribe((res: any) => {
        this.group = res as Group;
        this.groupForm.setValue({
          name: this.group.name,
          description: this.group.description,
        });
      });
    }
  }

  onSubmit() {
    const name = this.groupForm.controls.name.value as string;
    const description = this.groupForm.controls.description.value as string;
    this.isLoading = true;
    let submitObservable: Observable<any>;
    if (this.isEditing) {
      submitObservable = this.groupService.update(this.groupId, name, description);
    } else {
      submitObservable = this.groupService.create(name, description);
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
