import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarAvesComponent } from './buscar-aves/buscar-aves.component';
import { ListaAvesComponent } from './lista-aves/lista-aves.component';
import { VistaAveComponent } from './vista-ave/vista-ave.component';
import { AvesRoutingModule } from './aves-routing.module';
import { AvesSearchService } from './aves-search.service';
import { MaterialModule } from '../material';
import { WikiSearchService } from './wiki-search.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    AvesRoutingModule,
    MaterialModule,
    Ng2SearchPipeModule,
    FormsModule,
    FontAwesomeModule
  ],
  declarations: [
    ListaAvesComponent,
    VistaAveComponent,
    BuscarAvesComponent,
  ],
  providers: [AvesSearchService, WikiSearchService]
})
export class AvesModule { }
