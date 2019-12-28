import { ConfirmDialogComponent } from '../../../../common/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { Group } from 'src/app/model/Group';
import { GroupService } from 'src/app/services/group.service';
import { GroupCreateEditComponent } from '../group-create-edit/group-create-edit.component';
import { ChangeSubjectComponent } from 'src/app/components/common/change-subject/change-subject.component';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  private groupId: String

  group: Group
  isAdmin: boolean = false

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.userService.isRole("admin").pipe(first()).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin
    })
    this.activatedRoute.paramMap.pipe(first()).subscribe((map) => {
      this.groupId = map.get("groupId")
      this.fetchGroupInfo()
    })
  }

  onEdit() {
    const dialogRef = this.dialog.open(GroupCreateEditComponent, {
      width: '640px',
      data: this.groupId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchGroupInfo();
      }
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.delete(this.groupId).toPromise().then(_ => {
          this.router.navigateByUrl("/users/groups")
        })
      }
    });
  }

  fetchGroupInfo() {
    this.groupService.get(this.groupId).subscribe(group => {
      this.group = group
    })
  }

}
