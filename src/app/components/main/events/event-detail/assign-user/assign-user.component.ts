import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectElementComponent } from 'src/app/components/common/select-element/select-element.component';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/User';
import { Schedule } from 'src/app/model/Schedule';
import { AppConfig } from 'src/app/config/app-config';

export interface AssignUserData {
  schedule: Schedule;
  current: User[];
}

@Component({
  selector: 'app-assign-user',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.scss']
})
export class AssignUserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email'];
  displayedData = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.displayedData.paginator = paginator;
  }

  @ViewChild(MatSort, { static: false }) set sort(sort: MatSort) {
    this.displayedData.sort = sort;
  }
  constructor(
    public dialogRef: MatDialogRef<AssignUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssignUserData,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.fetchElements();
  }

  filter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.displayedData.filter = filterValue.trim().toLowerCase();
  }

  fetchElements() {
    this.userService.getAvailable(this.data.schedule.startDateTime).pipe(map((elements: any[]) => {
      console.log(elements);
      return elements.filter((element: any) => {
        return !(this.data.current != null && this.data.current.some(it => it.id === element.id));
      });
    })).subscribe((elements: any[]) => {
      this.displayedData.data = elements.map(item => {
        if (item.thumbnailUrl != null) {
          const url = AppConfig.BASE_URL + item.thumbnailUrl + '?random+\=' + Math.random();
          item.thumbnailUrl = url;
        }
        item.name = item.firstName + ' ' + item.lastName;
        return item;
      });
    });
  }

  onSelected(email) {
    this.dialogRef.close({
      email,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
