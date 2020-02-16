import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/model/Reservation';
import { MatDialog } from '@angular/material';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-reservation-requests',
  templateUrl: './reservation-requests.component.html',
  styleUrls: ['./reservation-requests.component.scss']
})
export class ReservationRequestsComponent implements OnInit {
  
  isAcademic: boolean;
  isManagerial: boolean;
  reservations: Reservation[];
  closedReservations: Reservation[];

  constructor(
    private dialog: MatDialog,
    private reservationService: ReservationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.isRole('academic').pipe(first()).subscribe((isAcademic: boolean) => {
      this.isAcademic = isAcademic;
    });
    this.userService.isRole('managerial').pipe(first()).subscribe((isManagerial: boolean) => {
      this.isManagerial = isManagerial;
    });
    this.fetchReservations();
  }

  onReview(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reservationService.review(id).subscribe((res) => {
          console.log(res);
          this.fetchReservations();
        });
      }
    });
  }

  onApprove(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reservationService.accept(id).subscribe((res) => {
          console.log(res);
          this.fetchReservations();
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
        this.reservationService.decline(id).subscribe((res) => {
          console.log(res);
          this.fetchReservations();
        });
      }
    });
  }

  fetchReservations() {
    this.reservationService.getOpen().pipe(first()).subscribe(reservations => {
      console.log(reservations);
      this.reservations = reservations;
    });
    this.reservationService.getClosed().pipe(first()).subscribe(reservations => {
      console.log(reservations);
      this.closedReservations = reservations;
    });
  }

}
