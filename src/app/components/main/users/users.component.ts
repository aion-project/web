import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  createForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  error: any
  isLoading: boolean = false
  isAdmin: boolean
  currentUser: any
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email']
  displayedData: any

  constructor(
    private userService: UserService,
    private router: Router
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
    let firstname = this.createForm.controls['firstName'].value as string;
    let lastname = this.createForm.controls['lastName'].value as string;
    let username = this.createForm.controls['username'].value as string;
    let email = this.createForm.controls['email'].value as string;
    let password = this.createForm.controls['password'].value as string;
    this.isLoading = true
    this.userService.create(firstname, lastname, username, email, password).subscribe((res: any) => {
      this.isLoading = false
      if (!res.success)
        this.error = res.msg
      else
        this.error = null
      this.fetchUsers()
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        this.error = err.message
      } else {
        this.error = err.toString()
      }
      console.log(err);
      this.isLoading = false
    })
  }

  fetchUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      console.log(users)
      this.displayedData = users
    })
  }
}
