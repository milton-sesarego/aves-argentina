import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Avistaje } from './avistaje';
import { map, switchMap, mergeMap, merge, take } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable()
export class AvistajesSearchService {

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
  ) { }

  addAvistaje() {
    this.afs.collection('avistajes').add(
      {
        id: this.afs.createId(),
        Latitud: '-40.9541145',
        Longitud: '-71.5363958',
        Nombre_Cientifico: 'Adelomyia melanogenys',
        timestamp: new Date().getTime()
      }
    ).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  fetchAvistajes(): Observable<Avistaje[]> {
      const avistajesRef = this.afs.collection('avistajes', ref => ref
      .orderBy('Nombre_Cientifico', 'desc')
      .limit(5))
      .valueChanges();

      const aves: Avistaje[] = [];

      return avistajesRef.pipe(
        map(res => {
          res.forEach((a) => {
              aves.push({
                fecha: a['timestamp'],
                nombrecient: a['Nombre_Cientifico'],
                latitud: a['Latitud'],
                longitud: a['Longitud']
              });

            });
          return aves;
          })
        );
    }
}
