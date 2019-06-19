import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  // State
  isLoading: Boolean = false
  error: String

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    let username = this.loginForm.controls['username'].value as string;
    let password = this.loginForm.controls['password'].value as string;
    this.isLoading = true
    this.authService.login(username, password).subscribe(success => {
      this.isLoading = false
      this.error = null
      if (success)
        this.router.navigate(['/']);
    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401)
          this.error = "Wrong credentials"
        else
          this.error = err.message
      } else {
        this.error = err.toString()
      }
      this.isLoading = false
    })
  }
}
