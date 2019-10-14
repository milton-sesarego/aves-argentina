import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabComponent } from './tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { AvesComponent } from './aves/aves.component';
import { VistaAveComponent } from './aves/vista-ave/vista-ave.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AvesSearchService } from './aves/aves-search.service';
import { WikiSearchService } from './aves/wiki-search.service';
import { AvistajesComponent } from './avistajes/avistajes.component';
import { VistaAvistajeComponent } from './avistajes/vista-avistaje/vista-avistaje.component';
import { AvistajesSearchService } from './avistajes/avistajes-search.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HTMLMarkerComponent } from './avistajes/html-marker.component';
@NgModule({
  imports:      [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  MaterialModule,
  BrowserAnimationsModule,
  MatTabsModule,
  FontAwesomeModule ,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
  Ng2SearchPipeModule,
  LeafletModule.forRoot()
],
  declarations: [
    AppComponent,
    TabComponent,
    AvesComponent,
    VistaAveComponent,
    AvistajesComponent,
    VistaAvistajeComponent,
    HTMLMarkerComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [ AngularFirestore, AvesSearchService, WikiSearchService , AvistajesSearchService]
})
export class AppModule { }

