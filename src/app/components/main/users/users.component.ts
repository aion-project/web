import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first, filter, skipUntil } from 'rxjs/operators';
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

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.myRoles().pipe(first()).subscribe((roles: any[]) => {
      if (roles.some(role => role.name == "admin"))
        this.isAdmin = true
    })
  }
  
}
