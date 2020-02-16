import { Component, OnInit } from '@angular/core';
import { Reschedule } from 'src/app/model/Reschedule';
import { RescheduleService } from 'src/app/services/reschedule.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-my-reschedule-requests',
  templateUrl: './my-reschedule-requests.component.html',
  styleUrls: ['./my-reschedule-requests.component.scss']
})
export class MyRescheduleRequestsComponent implements OnInit {

  reschedules: Reschedule[];

  constructor(
    private dialog: MatDialog,
    private rescheduleService: RescheduleService
  ) { }

  ngOnInit() {
    this.fetchMyReschedules();
  }

  onDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rescheduleService.delete(id).subscribe((res) => {
          console.log(res);
          this.fetchMyReschedules();
        });
      }
    });
  }

  fetchMyReschedules() {
    this.rescheduleService.getMine().pipe(first()).subscribe(reschedules => {
      console.log(reschedules);
      this.reschedules = reschedules;
    });
  }
}
