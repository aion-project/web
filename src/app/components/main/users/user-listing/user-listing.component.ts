import { Component, OnInit } from '@angular/core';
import { filter, first } from 'rxjs/operators';
import { UsersCreateComponent } from '../users-create/users-create.component';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {

  isAdmin: boolean
  currentUser: any
  displayedColumns: string[] = ['firstName', 'lastName', 'email']
  displayedData: any

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.me().pipe(
      filter(user => user != null),
      first(),
    ).subscribe(user => {
      this.currentUser = user
      if (this.currentUser.roles.some(role => role.name == "admin"))
        this.isAdmin = true
    })
    this.fetchUsers()
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

  fetchUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.displayedData = users
    })
  }
}
