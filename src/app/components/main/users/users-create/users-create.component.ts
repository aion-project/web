import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {

  createForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  error: any
  isLoading: boolean = false

  constructor(
    public dialogRef: MatDialogRef<UsersCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private userService: UserService,
  ) { }

  ngOnInit() { }

  onSubmit() {
    let firstname = this.createForm.controls['firstName'].value as string;
    let lastname = this.createForm.controls['lastName'].value as string;
    let username = this.createForm.controls['username'].value as string;
    let email = this.createForm.controls['email'].value as string;
    let password = this.createForm.controls['password'].value as string;
    this.isLoading = true
    this.userService.create(firstname, lastname, username, email, password).subscribe((res: any) => {
      this.isLoading = false
      this.dialogRef.close(true)
    }, (err) => {
      if (err instanceof HttpErrorResponse && err.error.msg) {
        this.error = err.error.msg
      } else {
        this.error = err.toString()
      }
      console.log(err);
      this.isLoading = false
    })
  }

  onCancel() {
    this.dialogRef.close()
  }

}
