import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { LocationService } from 'src/app/services/location.service';
import { first } from 'rxjs/operators';
import { LocationCreateEditComponent } from '../../locations/location-create-edit/location-create-edit.component';
import { EventService } from 'src/app/services/event.service';
import { EventCreateEditComponent } from '../event-create-edit/event-create-edit.component';
import { Subject } from 'rxjs';
import { Event } from 'src/app/model/Event';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.scss']
})
export class EventListingComponent implements OnInit {

  isAdmin: boolean;
  displayedColumns: string[] = ['name', 'description'];
  displayedData = new MatTableDataSource<Event>([]);

  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.displayedData.paginator = paginator;
  }
  
  @ViewChild(MatSort, { static: false }) set sort(sort: MatSort) {
    this.displayedData.sort = sort;
  }
  
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.userService.isRole('admin').pipe(first()).subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.fetchEvents();
  }

  create() {
    const dialogRef = this.dialog.open(EventCreateEditComponent, {
      width: '640px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchEvents();
      }
    });
  }

  filter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.displayedData.filter = filterValue.trim().toLowerCase();
  }

  fetchEvents() {
    this.eventService.getAll().pipe(first()).subscribe(events => {
      this.displayedData.data = events;
    });
  }

}
