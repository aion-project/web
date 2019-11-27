import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatCardModule, MatProgressBarModule, MatToolbarModule, MatDrawerContainer, MatSidenavModule, MatListModule, MatTabsModule, MatTableModule, MatIconModule, MatChipsModule, MatDialogModule, MatMenuModule, MatCheckboxModule } from '@angular/material';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    AngularDateTimePickerModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    AngularDateTimePickerModule,
  ]
})
export class MaterialModule { }
