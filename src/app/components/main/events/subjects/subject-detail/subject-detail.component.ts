import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { first } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectCreateEditComponent } from '../subject-create-edit/subject-create-edit.component';
import { Subject } from 'src/app/model/Subject';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {

  private subjectId: string;

  subject: Subject;
  isAdmin = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private subjectService: SubjectService,
  ) { }

  ngOnInit() {
    this.userService.isRole('admin').pipe(first()).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
    this.activatedRoute.paramMap.pipe(first()).subscribe((map) => {
      this.subjectId = map.get('subjectId');
      this.fetchSubjectInfo();
    });
  }

  onEditEvent() {
    const dialogRef = this.dialog.open(SubjectCreateEditComponent, {
      width: '640px',
      data: this.subjectId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchSubjectInfo();
      }
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectService.delete(this.subjectId).toPromise().then(_ => {
          this.router.navigateByUrl('/events/subjects');
        });
      }
    });
  }

  fetchSubjectInfo() {
    this.subjectService.get(this.subjectId).pipe(first()).subscribe(subject => {
      this.subject = subject;
    });
  }
}
