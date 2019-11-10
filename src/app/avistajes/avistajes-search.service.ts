import { Injectable } from '@angular/core';
import { Observable , BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Avistaje } from './avistaje';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable()
export class AvistajesSearchService {
  avistaje: Avistaje;

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient
  ) { }

  avistajeDefault = {
    posicion: null,
    nombrecient: 'nombre cientifico',
    fecha: null
  };

  dataChange = new BehaviorSubject<Avistaje>(this.avistajeDefault);

  showData(data) {
    this.avistaje = data;
    this.dataChange.next(data);
  }
  getData(): Observable<Avistaje> {
      return this.dataChange.asObservable();
  }

  fetchAvistajes(): Observable<Avistaje[]> {
    const avistajesRef = this.afs.collection('avistajes', ref => ref
    .orderBy('Nombre_Cientifico', 'desc')
    .limit(50))
    .valueChanges();

    return avistajesRef.pipe(
      map(res => {
        return res.map(a => {
          return {
            fecha: a['timestamp'],
            nombrecient: a['Nombre_Cientifico'],
            posicion: [ a['Latitud'], a['Longitud'] ]
          };
        });
      })
    );
  }
}
