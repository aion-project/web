import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/model/Reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {

  reservations: Reservation[];

  constructor(
    private dialog: MatDialog,
    private reservationService: ReservationService
  ) { }

  ngOnInit() {
    this.fetchMyReschedules();
  }

  create() {
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      width: '640px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchMyReschedules();
      }
    });
  }

  fetchMyReschedules() {
    this.reservationService.getMine().pipe(first()).subscribe(reservations => {
      console.log(reservations);
      this.reservations = reservations;
    });
  }
}
