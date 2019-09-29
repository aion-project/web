import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  editForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    bio: new FormControl('')
  })

  error: any
  isProfile: boolean = false
  isLoading: boolean = false
  user: any

  constructor(
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.isProfile = this.data == null
    let fetchMeObservable = this.isProfile ?
      this.userService.me().pipe(first()) :
      this.userService.get(this.data).pipe(first())
    fetchMeObservable.subscribe((user: any) => {
      this.user = user
      this.editForm.setValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio != null ? user.bio : "" 
      })
    })
  }

  onSubmit() {
    if (this.user == null)
      return

    let firstname = this.editForm.controls['firstName'].value as string;
    let lastname = this.editForm.controls['lastName'].value as string;
    let email = this.editForm.controls['email'].value as string;
    let bio = this.isProfile ? this.editForm.controls['bio'].value as string : this.user.bio;
    this.isLoading = true
    this.userService.update(this.user.id, firstname, lastname, email, bio).subscribe((res: any) => {
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
