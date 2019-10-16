import { Component, OnInit } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { Avistaje } from './avistajes/avistaje';
import { AvistajesSearchService } from './avistajes/avistajes-search.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit  {
  titulo = 'Aves de Argentina';

  avistajes$: Observable<Avistaje[]>;

  profile = {
    thumbnail: 'https://media.licdn.com/dms/image/C4E03AQHACwpKQTs-PA/profile-displayphoto-shrink_200_200/0?e=1575504000&v=beta&t=iE35UXxn0Jf4t6VCR7WC42tGu_EnLec_2ctnmxAY4u0' ,
    nombrecient: 'H. sapiens',
    nombrecomun: 'Milton Sesarego',
    familia: 'Hominidae',
    descripcion: 'Estudiante de Licenciatura en Informática en la Universidad Nacional del Oeste.',
    link: 'https://www.linkedin.com/in/milton-sesarego/'
  };

  constructor(
    private avistajesSearchService: AvistajesSearchService) {}

  ngOnInit() {
    this.avistajes$ = this.avistajesSearchService.fetchAvistajes();
  }

  addAvistaje() {
    this.avistajesSearchService.addAvistaje();
  }
}
