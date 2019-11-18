
import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { AvistajesComponent } from './avistajes/avistajes.component';
import { AvesComponent } from './aves/aves.component';
import { AvistajeAddComponent } from './avistaje-add/avistaje-add.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'aves', pathMatch: 'full'},
  {path: 'aves', component: AvesComponent},
  {path: 'avistajes', component: AvistajesComponent},
  {path: 'add_avistaje', component: AvistajeAddComponent},
  {path: 'acerca_de', component: AcercaDeComponent},
  {path: '**', redirectTo: 'aves', pathMatch: 'full'}
];

@NgModule({
imports: [
      RouterModule.forRoot(appRoutes)
],

exports: [RouterModule]
})
export class AppRoutingModule {}
