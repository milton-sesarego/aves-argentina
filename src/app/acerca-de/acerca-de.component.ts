import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  profile = {
    thumbnail: 'https://media.licdn.com/dms/image/C4E03AQHACwpKQTs-PA/profile-displayphoto-shrink_200_200/0?e=1575504000&v=beta&t=iE35UXxn0Jf4t6VCR7WC42tGu_EnLec_2ctnmxAY4u0' ,
    nombrecient: 'Homo sapiens',
    nombrecomun: 'Milton Sesarego',
    familia: 'Hominidae',
    descripcion: 'Estudiante de Licenciatura en Informática en la Universidad Nacional del Oeste.',
    link: 'https://www.linkedin.com/in/milton-sesarego/'
  };

  constructor() { }

  ngOnInit() {
  }
}
