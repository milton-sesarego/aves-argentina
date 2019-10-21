import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ave } from './ave';
import { map, switchMap, mergeMap, merge, take } from 'rxjs/operators';
import { WikiSearchService } from './wiki-search.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import dataset from './dataset/dataset.json';

@Injectable()
export class AvesSearchService {
  private from = 0;
  private offset = 20;
  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private wikiSearchService: WikiSearchService
  ) { }

  wikiURL(term: string): string {
    const tempTitle = term.replace(' ', '_');
    return 'https://es.wikipedia.org/wiki/' + tempTitle;
  }

  addAvistaje() {
    this.afs.collection('avistajes').add(
      {
        id: this.afs.createId(),
        name: "nombretest",
        place: "placetest",
        timestamp: new Date().getTime()
      }
    ).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  fetchAves(): Observable<Ave[]> {
    return of(dataset)
      .pipe(
        map(response => {
          const aves: Ave[] = [];
          const subresponse = response.slice(this.from, this.from + this.offset);
          this.from += this.offset;
          subresponse.forEach((a) => {
            this.wikiSearchService.fetchWiki(a["Nombre_Cientifico"])
              .subscribe(res => {
                aves.push({
                  thumbnail: res["thumbnail"]["source"],
                  imagen: res["originalimage"]["source"],
                  nombrecient: a["Nombre_Cientifico"],
                  nombrecomun: a["Nombre_Comun"],
                  familia: a["Familia"],
                  estado: a["Estado"],
                  descripcion: res["extract"],
                  link: this.wikiURL(a["Nombre_Cientifico"])
                });
              },
              err => {
                aves.push({
                  thumbnail: '',
                  imagen: '',
                  nombrecient: a['Nombre_Cientifico'],
                  nombrecomun: a['Nombre_Comun'],
                  familia: a['Familia'],
                  estado: a['Estado'],
                  descripcion: '',
                  link: this.wikiURL(a['Nombre_Cientifico'])
                });
              });
          });
          return aves;
        })
      );
  }
  /*
    fetchAves(): Observable<Ave[]> {
      const avesRef = this.afs.collection('aves', ref => ref
      .orderBy('Nombre_Cientifico', 'desc')
      .limit(5))
      .valueChanges();
      const aves: Ave[] = [];
      return avesRef.pipe(
        map(res => {
          res.forEach((a) => {
            this.wikiSearchService.fetchWiki(a['Nombre_Cientifico'])
              .subscribe(wres => {
                let thumb = '';
                let originalimage = '';
                let extract = '';

                if (wres.hasOwnProperty('thumbnail')) {
                  thumb = wres['thumbnail']['source'];
                }
                if (wres.hasOwnProperty('originalimage')) {
                  originalimage = wres['originalimage']['source'];
                }
                if (wres.hasOwnProperty('extract')) {
                  extract = wres['extract'];
                }

                aves.push({
                  thumbnail: thumb,
                  imagen: originalimage,
                  nombrecient: a['Nombre_Cientifico'],
                  nombrecomun: a['Nombre_Comun'],
                  familia: a['Familia'],
                  estado: a['Estado'],
                  descripcion: extract,
                  link: this.wikiURL(a['Nombre_Cientifico'])
                });
              },
                err => {
                  aves.push({
                    thumbnail: '',
                    imagen: '',
                    nombrecient: a['Nombre_Cientifico'],
                    nombrecomun: a['Nombre_Comun'],
                    familia: a['Familia'],
                    estado: a['Estado'],
                    descripcion: '',
                    link: this.wikiURL(a['Nombre_Cientifico'])
                  });
                }
              );
            });
          return aves;
          })
        );
    }
    */
}
