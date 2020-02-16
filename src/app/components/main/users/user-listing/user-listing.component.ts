import { Component, OnInit, ViewChild } from '@angular/core';
import { filter, first } from 'rxjs/operators';
import { UsersCreateComponent } from '../users-create/users-create.component';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {

  isAdmin: boolean;
  currentUser: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  displayedData = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.displayedData.paginator = paginator;
  }

  @ViewChild(MatSort, { static: false }) set sort(sort: MatSort) {
    this.displayedData.sort = sort;
  }

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.me().pipe(
      filter(user => user != null),
      first(),
    ).subscribe(user => {
      this.currentUser = user;
      if (this.currentUser.roles.some(role => role.name === 'admin')) {
        this.isAdmin = true;
      }
    });
    this.fetchUsers();
  }

  create() {
    const dialogRef = this.dialog.open(UsersCreateComponent, {
      width: '640px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchUsers();
      }
    });
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.displayedData.filter = filterValue.trim().toLowerCase();
  }

  fetchUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.displayedData.data = users
    });
  }
}
