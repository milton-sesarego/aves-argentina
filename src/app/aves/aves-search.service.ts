import { Injectable } from '@angular/core';
import { Observable, from , of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ave } from './ave';
import { map , switchMap , mergeMap, merge, take} from 'rxjs/operators';
import {WikiSearchService } from './wiki-search.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable()
export class AvesSearchService {

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private wikiSearchService: WikiSearchService
  ) { }

  wikiURL(term: string): string {
    const tempTitle = term.replace(' ', '_');
    return 'https://es.wikipedia.org/wiki/' + tempTitle;
  }

  fetchAves(): Observable<Ave[]> {
    const avesRef = this.afs.collection('avistajes', ref => ref.orderBy('Nombre_Cientifico', 'desc').limit(2)).valueChanges();
    const aves: Ave[] = [];

    return avesRef.pipe(
      map(res => {
        console.log(res);
        res.forEach((a) => {
          this.wikiSearchService.fetchWiki(a["Nombre_Cientifico"])
            .subscribe(wres => {
              aves.push({
                thumbnail: wres["thumbnail"]["source"],
                imagen: wres["originalimage"]["source"],
                nombrecient: a["Nombre_Cientifico"],
                nombrecomun: a["Nombre_Comun"],
                familia: a["Familia"],
                estado: a["Estado"],
                descripcion: wres["extract"],
                link: this.wikiURL(a["Nombre_Cientifico"])
              });
            },
              err => {
                aves.push({
                  thumbnail: '',
                  imagen: '',
                  nombrecient: a["Nombre_Cientifico"],
                  nombrecomun: a["Nombre_Comun"],
                  familia: a["Familia"],
                  estado: a["Estado"],
                  descripcion: '',
                  link: this.wikiURL(a["Nombre_Cientifico"])
                });
              }
            );
          });
          return aves;
        })
      );
  }
}
