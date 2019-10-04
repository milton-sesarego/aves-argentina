import { Injectable } from '@angular/core';
import { Observable, from , of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Ave } from './ave';
import { map , switchMap , mergeMap, merge} from 'rxjs/operators';
import {WikiSearchService } from './wiki-search.service';

@Injectable()
export class AvesSearchService {

  private avesUrl = "https://milton-sesarego.github.io/aves-de-argentina/aves.json";

  constructor(
    private http: HttpClient,
    private wikiSearchService: WikiSearchService
  ) { }

  wikiURL(term:string): string {
    const tempTitle = term.replace(' ', '_');
    return "https://es.wikipedia.org/wiki/"+tempTitle;
  }

  fetchAves(): Observable<Ave[]>{
    let url = `${this.avesUrl}`;
    return this.http.get<Object[]>(url)
      .pipe(
        map(response => {
            
            let aves: Ave[] = [];
            let subresponse = response.slice(0,10)
            
            subresponse.forEach((u) => {
                this.wikiSearchService.fetchWiki(u["Nombre_Cientifico"])
                .subscribe(res => {
                  
                  aves.push({
                    thumbnail: res["thumbnail"]["source"],
                    imagen: res["originalimage"]["source"],
                    nombrecient: u["Nombre_Cientifico"],
                    nombrecomun: u["Nombre_Comun"],
                    familia: u["Familia"],
                    estado: u["Estado"],
                    descripcion: res["extract"],
                    link: this.wikiURL(u["Nombre_Cientifico"])
                  })
                  
                })
            });
            return aves
          })
        
      )
  }
}