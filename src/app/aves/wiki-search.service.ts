import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, Subject } from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';

@Injectable()
export class WikiSearchService {
  searchList: string[] = [];
  search$ = new Subject<string>();
  baseUrl = 'https://es.wikipedia.org/api/rest_v1/page/summary/';

  constructor(
    private http: HttpClient) {}

  fetchWiki(term:string): Observable<WikiSummary> {
    const tempTitle = term.replace(' ', '_') + '?redirect=true';
    return this.http.get<WikiSummary>(this.baseUrl+tempTitle)
  }
}

export class WikiSummary {
  type?:          string;
  title?:         string;
  displaytitle?:  string;
  //namespace?:     Namespace;
  wikibase_item?: string;
  //titles?:        Titles;
  pageid?:        number;
  //thumbnail?:     Originalimage;
  //originalimage?: Originalimage;
  lang?:          string;
  dir?:           string;
  revision?:      string;
  tid?:           string;
  timestamp?:     Date;
  description?:   string;
  //content_urls?:  ContentUrls;
  //api_urls?:      APIUrls;
  extract?:       string;
  extract_html?:  string;
}