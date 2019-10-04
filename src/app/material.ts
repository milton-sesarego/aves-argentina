import { MatButtonModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatToolbarModule ],
  exports: [MatButtonModule, MatCardModule, MatToolbarModule ],
})
export class MaterialModule{ }