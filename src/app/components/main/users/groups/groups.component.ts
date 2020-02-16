import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { GroupService } from 'src/app/services/group.service';
import { GroupCreateEditComponent } from './group-create-edit/group-create-edit.component';
import { Group } from 'src/app/model/Group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  isFetching: boolean;
  isAdmin: boolean;
  currentUser: any;
  displayedColumns: string[] = ['name', 'description'];
  displayedData = new MatTableDataSource<Group>([]);

  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.displayedData.paginator = paginator;
  }

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.userService.isRole('admin').subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
    this.fetchResources();
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
    this.groupService.getAll().subscribe({
      next: (groups => {
        this.displayedData.data = groups;
      }),
      error: () => {
        this.isFetching = false;
      }
    });
  }
}

