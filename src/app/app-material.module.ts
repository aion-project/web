import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatCardModule, MatProgressBarModule, MatToolbarModule, MatDrawerContainer, MatSidenavModule, MatListModule } from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ]
})
export class MaterialModule { }
