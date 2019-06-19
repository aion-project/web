import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatCardModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
  ]
})
export class MaterialModule { }
