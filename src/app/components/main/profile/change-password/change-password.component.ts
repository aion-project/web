import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  error: any
  isLoading: boolean = false

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private userService: UserService,
  ) { }

  ngOnInit() { }

  onSubmit() {
    let currentPassword = this.passwordForm.controls['currentPassword'].value as string;
    let newPassword = this.passwordForm.controls['newPassword'].value as string;
    let confirmPassword = this.passwordForm.controls['confirmPassword'].value as string;

    if (newPassword != confirmPassword) {
      this.error = "Password needs to match"
      return;
    }

    this.isLoading = true
    this.userService.changePassword(currentPassword, newPassword).subscribe((res: any) => {
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
