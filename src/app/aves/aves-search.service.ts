import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ave } from './ave';
import { map, switchMap, mergeAll, merge, take } from 'rxjs/operators';
import { WikiSearchService } from './wiki-search.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import dataset from './dataset/dataset.json';

@Injectable()
export class AvesSearchService {
  private from = 0;
  private offset = 100;
  aves: Ave[] = [];
  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private wikiSearchService: WikiSearchService
  ) { }

  wikiURL(term: string): string {
    const tempTitle = term.replace(' ', '_');
    return 'https://es.wikipedia.org/wiki/' + tempTitle;
  }

  fetchAve(nombrecient: string): Ave {
    return this.aves.filter(x => x.nombrecient === nombrecient)[0];
  }

  fetchAves(): Observable<Ave[]> {
    if (this.aves.length > 0) {
      console.log('i\'ve been here before');
      return of(this.aves);
    }

    return of(dataset)
      .pipe(
        map(response => {
          this.aves = [];
          const subresponse = response.slice(this.from, this.from + this.offset);
          this.from += this.offset;
          subresponse.forEach((a) => {
            this.wikiSearchService.fetchWiki(a["Nombre_Cientifico"])
              .subscribe(res => {
                this.aves.push({
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
                this.aves.push({
                  thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png',
                  imagen: '',
                  nombrecient: a['Nombre_Cientifico'],
                  nombrecomun: a['Nombre_Comun'],
                  familia: a['Familia'],
                  estado: a['Estado'],
                  descripcion: 'No hay descripción disponible',
                  link: this.wikiURL(a['Nombre_Cientifico'])
                });
              });
          });
          return this.aves;
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
