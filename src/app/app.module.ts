import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { AvesComponent } from './aves/aves.component';
import { VistaAveComponent } from './aves/vista-ave/vista-ave.component';
import { AvesSearchService } from './aves/aves-search.service';
import { WikiSearchService } from './aves/wiki-search.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app.routing.module';
import { Routes, RouterModule} from '@angular/router';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

import { AvistajesComponent } from './avistajes/avistajes.component';
import { VistaAvistajeComponent } from './avistajes/vista-avistaje/vista-avistaje.component';
import { AvistajesSearchService } from './avistajes/avistajes-search.service';

import { AngularOpenlayersModule } from 'ngx-openlayers';

@NgModule({
  imports:      [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  MaterialModule,
  BrowserAnimationsModule,
  Ng2SearchPipeModule,
  AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
  AngularOpenlayersModule
],
  declarations: [
    AppComponent,
    AvesComponent,
    VistaAveComponent,AvistajesComponent,
    VistaAvistajeComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [ AvesSearchService, WikiSearchService,AngularFirestore, AvistajesSearchService ]
})
export class AppModule { }

