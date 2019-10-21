import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Avistaje } from './avistaje';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable()
export class AvistajesSearchService {

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient
  ) { }

  fetchAvistajes(): Observable<Avistaje[]> {
      const avistajesRef = this.afs.collection('avistajes', ref => ref
      .orderBy('Nombre_Cientifico', 'desc')
      .limit(50))
      .valueChanges();

      const aves: Avistaje[] = [];

      return avistajesRef.pipe(
        map(res => {
          res.forEach((a) => {
              aves.push({
                fecha: a['timestamp'],
                nombrecient: a['Nombre_Cientifico'],
                posicion: [ a['Latitud'], a['Longitud'] ]
              });
            });
          return aves;
          })
        );
    }
}
