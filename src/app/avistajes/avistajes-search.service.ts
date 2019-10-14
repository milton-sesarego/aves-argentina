import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Avistaje } from './avistaje';
import { map, switchMap, mergeMap, merge, take } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LatLngExpression} from 'leaflet';

export class Marker {
  id: number;
  name: string;
  description: string;
  position: LatLngExpression;
}


@Injectable()
export class AvistajesSearchService {

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
  ) { }


  markers: Marker[] = [
    {
      id: 1,
      name: 'Marker name 1',
      description: 'descr 1',
      position: [ 46.879966, -121.726909 ]
    },
    {
      id: 2,
      name: 'Marker name 2',
      description: 'descr 2',
      position: [ 46.000966, -123.726909 ]
    }
  ];

  getMarkers() {
    return this.markers;
  }

  getMarkerById(id) {
    return this.markers.filter((entry) => entry.id === id)[0];
  }

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
