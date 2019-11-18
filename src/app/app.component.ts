import { Component, OnInit, Input } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { Avistaje } from './avistajes/avistaje';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { AddService } from './add.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit  {
  titulo = 'Aves de Argentina';

  avistajes$: Observable<Avistaje[]>;

  constructor(
    private dataService: DataService,
    private addService: AddService,
    private router: Router
    ) {}

  ngOnInit() {
    this.addService.currentMessage.subscribe(evento => {
      if (evento.action === 'add') {
        this.navegar('/add_avistaje');
      }
    });
    this.avistajes$ = this.dataService.fetchAvistajes();
  }

  navegar(destino: string) {
    this.router.navigate([destino]);
  }

  onActivate(componentReference) {

  }
}
