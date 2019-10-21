import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { AddService } from '../add.service';
import { icon, latLng, Map, marker, Marker, polyline, tileLayer } from 'leaflet';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'avistajes-add',
  templateUrl: './avistaje-add.component.html',
  styleUrls: ['./avistaje-add.component.css'],
})

export class AvistajeAddComponent implements OnInit {
  map;
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 5,
    center: latLng([ -34.0000000 , -64.0000000 ])
  };

  @Input() nombrecient: string;
  constructor(private addService: AddService ) {}

  ngOnInit() {
    this.nombrecient = this.addService.getMensaje();
  }

  onMapReady(map: Map) {
    this.map = map;
  }

}
