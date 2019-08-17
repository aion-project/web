import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatCardModule, MatProgressBarModule, MatToolbarModule, MatDrawerContainer, MatSidenavModule, MatListModule, MatTabsModule, MatTableModule, MatIconModule, MatChipsModule, MatDialogModule } from '@angular/material';

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
  ]
})
export class MaterialModule { }
