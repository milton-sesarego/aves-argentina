import { Component, OnInit , ViewChild, TemplateRef, Output} from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { Ave } from './aves/ave';
import { AvesSearchService } from './aves/aves-search.service';
import { AvesComponent } from './aves/aves.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit  {
  titulo = 'Aves de Argentina';

  aves$: Observable<Ave[]>;

  @ViewChild('Explorar', {static: true})
  Explorar: TemplateRef<any>;

  @ViewChild('MisAvistajes', {static: true})
  MisAvistajes: TemplateRef<any>;

  @ViewChild('AcercaDe', {static: true})
  AcercaDe: TemplateRef<any>;

  allTabs: any;

  profile = {
    thumbnail: 'https://media.licdn.com/dms/image/C4E03AQHACwpKQTs-PA/profile-displayphoto-shrink_200_200/0?e=1575504000&v=beta&t=iE35UXxn0Jf4t6VCR7WC42tGu_EnLec_2ctnmxAY4u0' ,
    nombrecient: 'H. sapiens',
    nombrecomun: 'Milton Sesarego',
    familia: 'Hominidae',
    descripcion: 'Estudiante de Licenciatura en Informática en la Universidad Nacional del Oeste.',
    link: 'https://www.linkedin.com/in/milton-sesarego/'
  };

  constructor(
    private avesSearchService: AvesSearchService) {}

  ngOnInit() {
    this.allTabs = [
      {name: 'Explorar', template: this.Explorar},
      {name: 'Mis Avistajes', template: this.MisAvistajes},
      {name: 'Acerca De', template: this.AcercaDe}
    ];
  }

  navegarAAves() {
    this.aves$ = this.avesSearchService.fetchAves();
  }
}
