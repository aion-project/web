import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { GroupService } from 'src/app/services/group.service';
import { FormControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { ResourceService } from 'src/app/services/resource.service';

export const SelectElementType = {
  GROUP: 'group',
  RESOURCE: 'resource',
};

export interface SelectElementData {
  type: string;
  current: any[];
}

@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.scss']
})
export class SelectElementComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description'];
  displayedData = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.displayedData.paginator = paginator;
  }

  @ViewChild(MatSort, { static: false }) set sort(sort: MatSort) {
    this.displayedData.sort = sort;
  }

  constructor(
    public dialogRef: MatDialogRef<SelectElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectElementData,
    private groupService: GroupService,
    private resourceService: ResourceService,
  ) { }

  ngOnInit() {
    this.fetchElements();
  }

  filter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.displayedData.filter = filterValue.trim().toLowerCase();
  }

  fetchElements() {
    let observable;
    if (this.data.type === SelectElementType.GROUP) {
      observable = this.groupService.getAll();
    } else if (this.data.type === SelectElementType.RESOURCE) {
      observable = this.resourceService.getAll();
    }
    observable.pipe(map((elements: any[]) => {
      return elements.filter((element: any) => {
        return !(this.data.current != null && this.data.current.some(it => it.id === element.id));
      });
    })).subscribe((elements: any[]) => {
      this.displayedData.data = elements;
    });
  }

  onSelected(id) {
    this.dialogRef.close(id);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
