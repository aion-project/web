import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  isAdmin: boolean
  currentUser: any

  displayedColumns: string[] = ['firstname', 'lastname', 'username']
  displayedData: any

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.me().pipe(first()).subscribe(user => {
      this.currentUser = user
      if (this.currentUser.roles.some(role => role.name == "ADMIN"))
        this.isAdmin = true
    })
    this.userService.getAll().pipe(first()).subscribe(users => {
      console.log(users)
      this.displayedData = users
    })
  }

}
