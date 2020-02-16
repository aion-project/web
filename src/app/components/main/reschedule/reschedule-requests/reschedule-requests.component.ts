import { Component, OnInit } from '@angular/core';
import { Reschedule } from 'src/app/model/Reschedule';
import { RescheduleService } from 'src/app/services/reschedule.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-reschedule-requests',
  templateUrl: './reschedule-requests.component.html',
  styleUrls: ['./reschedule-requests.component.scss']
})
export class RescheduleRequestsComponent implements OnInit {

  isAcademic: boolean;
  reschedules: Reschedule[];
  doneReschedules: Reschedule[];

  constructor(
    private dialog: MatDialog,
    private rescheduleService: RescheduleService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.isRole('academic').pipe(first()).subscribe((isAcademic: boolean) => {
      this.isAcademic = isAcademic;
    });
    this.fetchReschedules();
  }

  onApprove(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rescheduleService.accept(id).subscribe((res) => {
          console.log(res);
          this.fetchReschedules();
        });
      }
    });
  }

  onDecline(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rescheduleService.decline(id).subscribe((res) => {
          console.log(res);
          this.fetchReschedules();
        });
      }
    });
  }

  fetchReschedules() {
    this.rescheduleService.getPending().pipe(first()).subscribe(reschedules => {
      console.log(reschedules);
      this.reschedules = reschedules;
    });
    this.rescheduleService.getReviewed().pipe(first()).subscribe(reschedules => {
      console.log(reschedules);
      this.doneReschedules = reschedules;
    });
  }
  
}
