import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UsersCreateComponent } from './users-create/users-create.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  isAdmin: boolean
  currentUser: any
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email']
  displayedData: any

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.me().pipe(first()).subscribe(user => {
      this.currentUser = user
      if (this.currentUser.roles.some(role => role == "Admin"))
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
