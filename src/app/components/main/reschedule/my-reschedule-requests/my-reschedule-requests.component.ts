import { Component, OnInit } from '@angular/core';
import { Reschedule } from 'src/app/model/Reschedule';
import { RescheduleService } from 'src/app/services/reschedule.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-my-reschedule-requests',
  templateUrl: './my-reschedule-requests.component.html',
  styleUrls: ['./my-reschedule-requests.component.scss']
})
export class MyRescheduleRequestsComponent implements OnInit {

  reschedules: Reschedule[];

  constructor(
    private rescheduleService: RescheduleService
  ) { }

  ngOnInit() {
    this.fetchMyReschedules();
  }

  fetchMyReschedules() {
    this.rescheduleService.getMine().pipe(first()).subscribe(reschedules => {
      console.log(reschedules);
      this.reschedules = reschedules;
    });
  }
}
