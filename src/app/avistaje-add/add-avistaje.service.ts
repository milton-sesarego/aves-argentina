import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, mergeMap, merge, take } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable()
export class AddAvistajeService {

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient
  ) { }

  addAvistaje(lat: string, lon: string, nombrec: string) {
    this.afs.collection('avistajes').add(
      {
        id: this.afs.createId(),
        Latitud: lat,
        Longitud: lon,
        Nombre_Cientifico: nombrec,
        timestamp: new Date().getTime()
      }
    ).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }
}
