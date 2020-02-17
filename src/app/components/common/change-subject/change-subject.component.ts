import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
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

  displayedColumns: string[] = ['name', 'description'];
  displayedData = new MatTableDataSource<Subject>(null);

  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.displayedData.paginator = paginator;
  }

  @ViewChild(MatSort, { static: false }) set sort(sort: MatSort) {
    this.displayedData.sort = sort;
  }

  constructor(
    public dialogRef: MatDialogRef<ChangeSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subjectService: SubjectService,
  ) { }

  ngOnInit() {
    this.fetchRoles();
  }

  filter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.displayedData.filter = filterValue.trim().toLowerCase();
  }

  fetchRoles() {
    this.subjectService.getAll().pipe(first()).subscribe((subjects) => {
      this.displayedData.data = subjects;
    });
  }

  onSubjectSelected(subject) {
    this.dialogRef.close(subject);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
