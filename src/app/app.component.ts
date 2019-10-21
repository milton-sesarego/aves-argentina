import { Component, OnInit, Input } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { Avistaje } from './avistajes/avistaje';
import { AvistajesSearchService } from './avistajes/avistajes-search.service';
import { Router } from '@angular/router';
import { AddService } from './add.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit  {
  profile = {
    thumbnail: 'https://media.licdn.com/dms/image/C4E03AQHACwpKQTs-PA/profile-displayphoto-shrink_200_200/0?e=1575504000&v=beta&t=iE35UXxn0Jf4t6VCR7WC42tGu_EnLec_2ctnmxAY4u0' ,
    nombrecient: 'H. sapiens',
    nombrecomun: 'Milton Sesarego',
    familia: 'Hominidae',
    descripcion: 'Estudiante de Licenciatura en Informática en la Universidad Nacional del Oeste.',
    link: 'https://www.linkedin.com/in/milton-sesarego/'
  };

  titulo = 'Aves de Argentina';

  avistajes$: Observable<Avistaje[]>;

  message: string;

  constructor(
    private avistajesSearchService: AvistajesSearchService,
    private addService: AddService,
    private router: Router
    ) {}

  ngOnInit() {
    this.addService.currentMessage.subscribe(message => {
      this.message = message;
      console.log(this.message);
      this.navegar('/add_avistaje');
    });
    this.avistajes$ = this.avistajesSearchService.fetchAvistajes();
  }

  addAvistaje() {
    this.avistajesSearchService.addAvistaje();
  }

  navegar(destino: string) {
    this.router.navigate([destino]);
  }

  onActivate(componentReference) {
    console.log(componentReference);
  }
}
