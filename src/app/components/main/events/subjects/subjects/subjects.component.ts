import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';
import { first } from 'rxjs/operators';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectCreateEditComponent } from '../subject-create-edit/subject-create-edit.component';
import { Subject } from 'src/app/model/Subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  isAdmin: boolean;
  displayedColumns: string[] = ['name', 'description'];
  displayedData = new MatTableDataSource<Subject>([]);

  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.displayedData.paginator = paginator;
  }
  
  @ViewChild(MatSort, { static: false }) set sort(sort: MatSort) {
    this.displayedData.sort = sort;
  }
  
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit() {
    this.userService.isRole('admin').pipe(first()).subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.fetchSubjects();
  }

  create() {
    const dialogRef = this.dialog.open(SubjectCreateEditComponent, {
      width: '640px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchSubjects();
      }
    });
  }

  filter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.displayedData.filter = filterValue.trim().toLowerCase();
  }

  fetchSubjects() {
    this.subjectService.getAll().pipe(first()).subscribe(subjects => {
      this.displayedData.data = subjects;
    });
  }

}
