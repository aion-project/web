import { ConfirmDialogComponent } from './../../../../common/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from './../../../../../services/resource.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import { ResourceCreateEditComponent } from '../resource-create-edit/resource-create-edit.component';
import { Resource } from 'src/app/model/Resource';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss']
})
export class ResourceDetailComponent implements OnInit {

  private resourceId: string;

  resource: Resource;
  isAdmin = false;

  constructor(
    private userService: UserService,
    private resourceService: ResourceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.userService.isRole('admin').pipe(first()).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
    this.activatedRoute.paramMap.pipe(first()).subscribe((map) => {
      this.resourceId = map.get('resourceId');
      this.fetchResourceInfo();
    });
  }

  onEditResource() {
    const dialogRef = this.dialog.open(ResourceCreateEditComponent, {
      width: '640px',
      data: this.resourceId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchResourceInfo();
      }
    });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resourceService.delete(this.resourceId).toPromise().then(_ => {
          this.router.navigateByUrl('/locations/resources');
        });
      }
    });
  }

  fetchResourceInfo() {
    this.resourceService.get(this.resourceId).pipe(first()).subscribe(resource => {
      this.resource = resource;
    });
  }

}
