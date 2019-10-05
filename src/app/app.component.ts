import { Component, OnInit , ViewChild, TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from, Subject } from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { Ave } from './aves/ave';
import { FirebaseService } from './firebase.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit  {
  titulo = 'Aves de Argentina';
  categoriasTest: Observable<any[]>;

  @ViewChild('Explorar', {static: false})
  Explorar: TemplateRef<any>;

  @ViewChild('MisAvistajes', {static: false})
  MisAvistajes: TemplateRef<any>;

  @ViewChild('AcercaDe', {static: false})
  AcercaDe: TemplateRef<any>;

  allTabs: any;
  searchText;
  profile = {
    thumbnail: 'https://media.licdn.com/dms/image/C4E03AQHACwpKQTs-PA/profile-displayphoto-shrink_200_200/0?e=1575504000&v=beta&t=iE35UXxn0Jf4t6VCR7WC42tGu_EnLec_2ctnmxAY4u0' ,
    nombrecient: 'H. sapiens',
    nombrecomun: 'Milton Sesarego',
    familia: 'Hominidae',
    descripcion: 'Estudiante de Licenciatura en Informática en la Universidad Nacional del Oeste.',
    link: 'https://www.linkedin.com/in/milton-sesarego/'
  };

  getCategoriasTest() {
    this.categoriasTest = this.fs.getCategoriasTest();
  }

  constructor(
    private router: Router,
    private fs: FirebaseService, private afs: AngularFirestore) {}

  ngOnInit() {
    this.allTabs = [
      {name: 'Explorar', template: this.Explorar},
      {name: 'Mis Avistajes', template: this.MisAvistajes},
      {name: 'Acerca De', template: this.AcercaDe}
    ];
  }

  navegarAAves(e) {

    this.router.navigate(['/aves/buscar']);
    this.getCategoriasTest();
  }
}
