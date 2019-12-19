import { Component, OnInit, Inject } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { first, filter, map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/model/Location';

@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.scss']
})
export class ChangeLocationComponent implements OnInit {

  locations: Location[];

  constructor(
    public dialogRef: MatDialogRef<ChangeLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.fetchRoles()
  }

  fetchRoles() {
    this.locationService.getAll().pipe(first()).subscribe((locations) => {
      this.locations = locations
    })
  }

  onLocationSelected(location) {
    this.dialogRef.close(location);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
