import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResourceCreateEditComponent } from '../../../locations/resources/resource-create-edit/resource-create-edit.component';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'src/app/model/Subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject-create-edit',
  templateUrl: './subject-create-edit.component.html',
  styleUrls: ['./subject-create-edit.component.scss']
})
export class SubjectCreateEditComponent implements OnInit {

  subjectForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  })

  error: any
  isEditing: boolean = false
  isLoading: boolean = false
  subject: Subject

  constructor(
    public dialogRef: MatDialogRef<ResourceCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public subjectId: String,
    private subjectService: SubjectService,
  ) { }

  ngOnInit() {
    this.isEditing = this.subjectId != null
    if (this.isEditing) {
      this.subjectService.get(this.subjectId).subscribe((res: any) => {
        this.subject = res as Subject
        this.subjectForm.setValue({
          name: this.subject.name,
          description: this.subject.description,
        })
      })
    }
  }

  onSubmit() {
    let name = this.subjectForm.controls['name'].value as string;
    let description = this.subjectForm.controls['description'].value as string;
    this.isLoading = true
    var submitObservable: Observable<any>
    if (this.isEditing) {
      submitObservable = this.subjectService.update(this.subjectId, name, description)
    } else {
      submitObservable = this.subjectService.create(name, description)
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
