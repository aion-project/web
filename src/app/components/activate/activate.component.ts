import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() { }

  onActivateAccount() {
    this.isLoading = true;
    this.userService.activate().toPromise().then(_ => {
      this.router.navigateByUrl('/');
    }).catch( _ => {
      this.isLoading = false;
    });
  }

}
