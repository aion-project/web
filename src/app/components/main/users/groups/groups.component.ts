import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { GroupService } from 'src/app/services/group.service';
import { GroupCreateEditComponent } from './group-create-edit/group-create-edit.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  isFetching: boolean;
  isAdmin: boolean
  currentUser: any
  displayedColumns: string[] = ['name', 'description']
  displayedData: any

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.userService.isRole("admin").subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin
    })
    this.fetchResources()
  }

  create() {
    const dialogRef = this.dialog.open(GroupCreateEditComponent, {
      width: '640px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchResources();
      }
    });
  }

  fetchResources() {
    this.isFetching = true;
    this.groupService.getAll().subscribe(groups => {
      this.displayedData = groups
    }, null, () => {
      this.isFetching = false;
    })
  }
}

