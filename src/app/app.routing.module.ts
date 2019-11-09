
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';

import { AvistajesComponent } from './avistajes/avistajes.component';
import { VistaAvistajeComponent } from './avistajes/vista-avistaje/vista-avistaje.component';
import { AvistajesSearchService } from './avistajes/avistajes-search.service';

import { AvesComponent } from './aves/aves.component';
import { VistaAveComponent } from './aves/vista-ave/vista-ave.component';
import { AvesSearchService } from './aves/aves-search.service';
import { WikiSearchService } from './aves/wiki-search.service';
import { AvistajeAddComponent } from './avistaje-add/avistaje-add.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'aves', pathMatch: 'full'},
  {path: 'aves', component: AvesComponent},
  {path: 'avistajes', component: AvistajesComponent},
  {path: 'avistajes', component: VistaAvistajeComponent,
    outlet: 'sidebar-avistaje'},
  /*children: [
    {
    path:  'avistaje_sidebar',
    component:  VistaAvistajeComponent
    }]
  },*/
  {path: 'add_avistaje', component: AvistajeAddComponent},
  {path: '**', redirectTo: 'aves', pathMatch: 'full'}
];

@NgModule({
imports: [
      // RouterModule.forRoot(appRoutes),
      RouterModule.forRoot(appRoutes)
],

exports: [RouterModule]
})
export class AppRoutingModule {}
