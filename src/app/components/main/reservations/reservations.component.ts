import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  isManagerial: boolean;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.isRoleIn(['academic', 'managerial']).pipe(first()).subscribe((isManagerial: boolean) => {
      console.log(isManagerial);
      this.isManagerial = isManagerial;
    });
  }

}
