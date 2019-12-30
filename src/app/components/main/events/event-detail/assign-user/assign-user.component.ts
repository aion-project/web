import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectElementComponent } from 'src/app/components/common/select-element/select-element.component';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { Assignment } from 'src/app/model/Assignment';

export interface AssignUserData {
  current: Assignment[]
}

@Component({
  selector: 'app-assign-user',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.scss']
})
export class AssignUserComponent implements OnInit {

  search = new FormControl('');
  searchSubscription: Subscription

  unfilteredElements: any[];
  elements: any[];

  constructor(
    public dialogRef: MatDialogRef<SelectElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssignUserData,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.fetchElements();
    this.searchSubscription = this.search.valueChanges.pipe(distinctUntilChanged()).subscribe(query => {
      this.elements = this.unfilteredElements.filter(element => element.firstName.toLowerCase().includes(query.toLowerCase()))
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription && !this.searchSubscription.closed) {
      this.searchSubscription.unsubscribe();
    }
  }

  fetchElements() {
    this.userService.getAll().pipe(map((elements: any[]) => {
      return elements.map(element => {
        const filteredRoles = element.roles.filter(role => role.name == "lecturer" || role.name == "instructor");

        element.roles = filteredRoles;
        return element;
      }).filter((element: any) => {
        return !(this.data.current != null && this.data.current.some(it => it.user.id == element.id)) && element.roles.length > 0;
      })
    })).subscribe((elements: any[]) => {
      this.unfilteredElements = elements
      this.elements = elements
    })
  }

  onSelected(email, roleId) {
    this.dialogRef.close({
      email: email,
      roleId: roleId
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
