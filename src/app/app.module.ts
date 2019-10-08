import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabComponent } from './tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, MaterialModule, BrowserAnimationsModule,
  MatTabsModule, FontAwesomeModule ,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule],
  declarations: [ AppComponent, TabComponent],
  bootstrap:    [ AppComponent ],
  providers: [ AngularFirestore ]
})
export class AppModule { }

