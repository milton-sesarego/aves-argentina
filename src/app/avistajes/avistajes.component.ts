import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Avistaje } from './avistaje';
import { AvistajesSearchService } from './avistajes-search.service';
import { icon, latLng, Map, marker, Marker, polyline, tileLayer } from 'leaflet';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mapa-avistajes',
  templateUrl: './avistajes.component.html',
  styleUrls: ['./avistajes.component.css'],
})

export class AvistajesComponent implements OnInit {
  @Input() avistajes$: Observable<Avistaje[]>;
  map;

  punto = marker([ -40.9141145, -71.5863958 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 5,
    center: latLng([ -34.0000000 , -64.0000000 ])
  };

  constructor(private dataService: AvistajesSearchService,
    ) {}


  ngOnInit() {
  }

  onMapReady(map: Map) {
    this.map = map;
    this.addMarker();
  }

  addMarker() {
    this.dataService.fetchAvistajes().subscribe(arr => {
      arr.forEach(entry => {
        const m = marker(entry.posicion,
          {
            icon: icon({
              iconSize: [ 25, 41 ],
              iconAnchor: [ 13, 41 ],
              iconUrl: 'leaflet/marker-icon.png',
              shadowUrl: 'leaflet/marker-shadow.png'
            })
          });
        m.bindPopup('<strong>'+entry.nombrecient+'</strong>').openPopup();
        m.addTo(this.map);
      });
    });
  }
}
