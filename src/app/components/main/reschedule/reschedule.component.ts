import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.scss']
})
export class RescheduleComponent implements OnInit {

  isAdmin: boolean;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.isRole('admin').pipe(first()).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }
  
}
