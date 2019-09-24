import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss']
})
export class AvatarUploadComponent implements OnInit {

  file: any

  error: any
  isLoading: boolean = false

  constructor(
    public dialogRef: MatDialogRef<AvatarUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
    private userService: UserService,
  ) { }

  ngOnInit() { }

  onFileChange($event) {
    let inputValue = $event.target;
    let file: File = inputValue.files[0];
    let myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.file = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  onSubmit() {
    if (!!this.file) {
      let data = this.file.split(",")[1]
      this.isLoading = true
      this.userService.uploadAvatar("jpg", "image/jpeg", data).subscribe((res: any) => {
        this.isLoading = false
        this.dialogRef.close(true)
      }, (err) => {
        if (err instanceof HttpErrorResponse) {
          this.error = err.message
        } else {
          this.error = err.toString()
        }
        console.log(err);
        this.isLoading = false
        this.dialogRef.close()
      })
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
