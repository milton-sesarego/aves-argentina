import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { AvistajeAddComponent } from './avistaje-add/avistaje-add.component';

import { AddService } from './add.service';

import { AngularOpenlayersModule } from 'ngx-openlayers';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports:      [
  BrowserModule,
  LeafletModule.forRoot(),
  FormsModule,
  HttpClientModule,
  BrowserAnimationsModule,
  Ng2SearchPipeModule,
  AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
  AngularOpenlayersModule,
  NgbModule
],
  declarations: [
    AppComponent,
    AvesComponent,
    VistaAveComponent,
    AvistajesComponent,
    VistaAvistajeComponent,
    AvistajeAddComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [ AddService, AvesSearchService, WikiSearchService, AngularFirestore, AvistajesSearchService ]
})
export class AppModule { }

