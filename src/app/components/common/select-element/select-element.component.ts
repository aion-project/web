import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GroupService } from 'src/app/services/group.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
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
export class SelectElementComponent implements OnInit, OnDestroy {

  search = new FormControl('');
  searchSubscription: Subscription;

  unfilteredElements: any[];
  elements: any[];

  constructor(
    public dialogRef: MatDialogRef<SelectElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectElementData,
    private groupService: GroupService,
    private resourceService: ResourceService,
  ) { }

  ngOnInit() {
    this.fetchElements();
    this.searchSubscription = this.search.valueChanges.pipe(distinctUntilChanged()).subscribe(query => {
      this.elements = this.unfilteredElements.filter(element => element.name.toLowerCase().includes(query.toLowerCase()));
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription && !this.searchSubscription.closed) {
      this.searchSubscription.unsubscribe();
    }
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
      this.unfilteredElements = elements;
      this.elements = elements;
    });
  }

  onSelected(id) {
    this.dialogRef.close(id);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
