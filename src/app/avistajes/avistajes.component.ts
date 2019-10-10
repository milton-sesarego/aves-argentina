import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core'
import { Observable } from 'rxjs';
import { Avistaje } from './avistaje';
import { marker } from './marker.image'
import { proj, View } from 'openlayers'
import { HttpClient } from '@angular/common/http'
import { Subscription } from 'rxjs'
import { GeoLocationService } from './geo-location.service'

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mapa-avistajes',
  templateUrl: './avistajes.component.html',
  styleUrls: ['./avistajes.component.css']
})
export class AvistajesComponent implements OnInit {

  @Input() avistajes$: Observable<Avistaje[]>;
  zoom = 5;

  // posicion inicial
  latitud = -34.0000000;
  longitud = -64.0000000;

  constructor() { }

  ngOnInit() {
  }

}
