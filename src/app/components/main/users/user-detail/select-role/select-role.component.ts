import { Component, OnInit, Inject } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { first, filter, map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface SelectRoleData {
  roleName: String,
  currentRoles: any[]
}

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss']
})
export class SelectRoleComponent implements OnInit {

  roles: any[];

  constructor(
    public dialogRef: MatDialogRef<SelectRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectRoleData,
    private roleService: RoleService,
  ) { }

  ngOnInit() {
    this.fetchRoles()
  }

  fetchRoles() {
    console.log(this.data.currentRoles)
    this.roleService.getAll().pipe(first(), map((roles: any[]) => {
      return roles.filter((roles: any) => {
        return !(this.data.currentRoles != null && this.data.currentRoles.includes(roles.name))
      })
    })).subscribe((roles: any[]) => {
      this.roles = roles
    })
  }

  onRoleSelected(roleName) {
    this.dialogRef.close(roleName);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
