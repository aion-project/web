import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatCardModule, MatProgressBarModule, MatToolbarModule, MatDrawerContainer, MatSidenavModule, MatListModule, MatTabsModule, MatTableModule, MatIconModule, MatChipsModule, MatDialogModule, MatMenuModule, MatCheckboxModule } from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

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
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
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
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ]
})
export class MaterialModule { }
