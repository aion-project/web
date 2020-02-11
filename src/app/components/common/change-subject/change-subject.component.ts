import { Component, OnInit, Inject } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/model/Location';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/model/Subject';

@Component({
  selector: 'app-change-subject',
  templateUrl: './change-subject.component.html',
  styleUrls: ['./change-subject.component.scss']
})
export class ChangeSubjectComponent implements OnInit {

  subjects: Subject[];

  constructor(
    public dialogRef: MatDialogRef<ChangeSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subjectService: SubjectService,
  ) { }

  ngOnInit() {
    this.fetchRoles();
  }

  fetchRoles() {
    this.subjectService.getAll().pipe(first()).subscribe((subjects) => {
      this.subjects = subjects;
    });
  }

  onSubjectSelected(subject) {
    this.dialogRef.close(subject);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
