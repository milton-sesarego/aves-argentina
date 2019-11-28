import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Avistaje } from './avistajes/avistaje';
import { Ave } from './aves/ave';
import dataset from './aves/dataset/dataset.json';
// import firebase from 'firebase';

export class WikiSummary {
  type?: string;
  title?: string;
  displaytitle?: string;
  // namespace?:     Namespace;
  // tslint:disable-next-line: variable-name
  wikibase_item?: string;
  // titles?:        Titles;
  pageid?: number;
  // thumbnail?:     Originalimage;
  // originalimage?: Originalimage;
  lang?: string;
  dir?: string;
  revision?: string;
  tid?: string;
  timestamp?: Date;
  description?: string;
  // content_urls?:  ContentUrls;
  // api_urls?:      APIUrls;
  extract?: string;
  // tslint:disable-next-line: variable-name
  extract_html?: string;
}

@Injectable()
export class DataService {

  // Aves
  aves$: Observable<Ave[]>;
  aves: Ave[] = [];

  // Wikipedia
  searchList: string[] = [];
  search$ = new Subject<string>();
  baseUrl = 'https://es.wikipedia.org/api/rest_v1/page/summary/';

  // Avistajes
  avistaje: Avistaje;
  dataChange = new ReplaySubject<any>(1);

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient
  ) {
    this.aves$ = this.fetchAves();
    this.aves$.subscribe(res => {
        res.map(a => {
          this.completeWiki(a);
        });
      });
  }

  // Avistaje

  setSelected(avistaje) {
    const ave = this.fetchAve(avistaje.nombrecient);
    this.dataChange.next({avistaje, ave});
  }

  getData(): Observable<any> {
    return this.dataChange.asObservable();
  }

  fetchAvistajes(): Observable<Avistaje[]> {
    const avistajesRef = this.afs.collection('avistajes', ref => ref
    .orderBy('Nombre_Cientifico', 'desc').limit(50))
    .valueChanges();

    return avistajesRef.pipe(
      map(res => {
        return res.map(a => {
          return {
            fecha: a['timestamp'],
            nombrecient: a['Nombre_Cientifico'],
            posicion: [ a['Latitud'], a['Longitud'] ],
            comentario: a['Comentario']
          };
        });
      })
    );
  }

  addAvistaje(lat: string, lon: string, nombrec: string, coment: string) {
    this.afs.collection('avistajes').add(
      {
        id: this.afs.createId(),
        Latitud: lat,
        Longitud: lon,
        Nombre_Cientifico: nombrec,
        Comentario: coment,
        timestamp: new Date()
      }
    ).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  // Aves

  fetchAve(nombrecient: string): Ave {
    const ave = this.aves.filter(x => x.nombrecient === nombrecient)[0];
    if (ave.thumbnail == null) { this.completeWiki(ave); }
    return ave;
  }

  getAves(): Observable<Ave[]> { return of(this.aves); }

  fetchAves(): Observable<Ave[]> {
    return of(dataset)
      .pipe(
        map(response => {
          this.aves = [];
          response.forEach((a) => {
            if (a["Nombre_Comun"].length === 0) { a["Nombre_Comun"] = '-'; }
            this.aves.push({
              thumbnail: null,
              imagen: null,
              nombrecient: a["Nombre_Cientifico"],
              nombrecomun: a["Nombre_Comun"],
              familia: a["Familia"],
              estado: a["Estado"],
              descripcion: null,
              link: this.wikiURL(a["Nombre_Cientifico"])
            });
          });
          return this.aves;
        })
      );
  }

  // Wikipedia

  wikiURL(term: string): string {
    const tempTitle = term.replace(' ', '_');
    return 'https://es.wikipedia.org/wiki/' + tempTitle;
  }

  completeWiki(a: Ave) {
    this.fetchWiki(a.nombrecient)
      .subscribe(res => {
          a.thumbnail = res["thumbnail"]["source"];
          a.imagen = res["originalimage"]["source"];
          a.descripcion = res["extract"];
      }, err => {
        a.thumbnail = 'https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png';
        a.imagen = '';
        a.descripcion = 'No hay descripción disponible';
      });
  }

  fetchWiki(term: string): Observable<WikiSummary> {
    const tempTitle = term.replace(' ', '_') + '?redirect=true';
    return this.http.get<WikiSummary>(this.baseUrl + tempTitle);
  }
}
