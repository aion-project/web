import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GroupService } from 'src/app/services/group.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/model/Group';

export interface SelectGroupData {
  currentGroups: any[]
}

@Component({
  selector: 'app-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.scss']
})
export class SelectGroupComponent implements OnInit, OnDestroy {

  search = new FormControl('');
  searchSubscription: Subscription

  unfilteredGroups: Group[];
  groups: Group[];

  constructor(
    public dialogRef: MatDialogRef<SelectGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectGroupData,
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    this.fetchGroups();
    this.searchSubscription = this.search.valueChanges.pipe(distinctUntilChanged()).subscribe(query => {
      this.groups = this.unfilteredGroups.filter(group => group.name.toLowerCase().includes(query.toLowerCase()))
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription && !this.searchSubscription.closed) {
      this.searchSubscription.unsubscribe();
    }
  }

  fetchGroups() {
    this.groupService.getAll().pipe(map((groups: any[]) => {
      return groups.filter((group: any) => {
        return !(this.data.currentGroups != null && this.data.currentGroups.some(it => it.id == group.id))
      })
    })).subscribe((groups: any[]) => {
      this.unfilteredGroups = groups
      this.groups = groups
    })
  }

  onGroupSelected(groupId) {
    this.dialogRef.close(groupId);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
