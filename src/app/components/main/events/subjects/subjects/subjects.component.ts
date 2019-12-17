import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';
import { first } from 'rxjs/operators';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  isAdmin: Boolean;
  displayedColumns: string[] = ['name', 'description'];
  displayedData: any;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit() {
    this.userService.isRole("admin").pipe(first()).subscribe((isAdmin) => {
      this.isAdmin = isAdmin
    })
    this.fetchSubjects()
  }

  create() {
    // const dialogRef = this.dialog.open(EventCreateEditComponent, {
    //   width: '640px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.fetchEvents();
    //   }
    // });
  }

  fetchSubjects() {
    this.subjectService.getAll().pipe(first()).subscribe(subjects => {
      this.displayedData = subjects
    })
  }

}
