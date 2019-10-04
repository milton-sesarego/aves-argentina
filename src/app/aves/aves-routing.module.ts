import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarAvesComponent } from './buscar-aves/buscar-aves.component';

const routes: Routes = [
  {
    path: 'buscar',
    component: BuscarAvesComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AvesRoutingModule {}