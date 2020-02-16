import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationCreateEditComponent } from '../location-create-edit/location-create-edit.component';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LocationService } from 'src/app/services/location.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Location } from "src/app/model/Location";

@Component({
  selector: 'app-location-listing',
  templateUrl: './location-listing.component.html',
  styleUrls: ['./location-listing.component.scss']
})
export class LocationListingComponent implements OnInit {

  isAdmin: boolean;
  displayedColumns: string[] = ['name', 'level', 'description'];
  displayedData = new MatTableDataSource<Location>(null);

  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.displayedData.paginator = paginator;
  }

  @ViewChild(MatSort, { static: false }) set sort(sort: MatSort) {
    this.displayedData.sort = sort;
  }

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.userService.isRole('admin').pipe(first()).subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.fetchLocations();
  }

  create() {
    const dialogRef = this.dialog.open(LocationCreateEditComponent, {
      width: '640px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchLocations();
      }
    });
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.displayedData.filter = filterValue.trim().toLowerCase();
  }

  fetchLocations() {
    this.locationService.getAll().pipe(first()).subscribe(locations => {
      this.displayedData.data = locations;
    });
  }

}
