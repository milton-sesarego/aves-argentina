import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { Observable , of, Subject} from 'rxjs';
import { Avistaje } from './avistaje';
import { Router } from '@angular/router';
import { icon, latLng, Map, marker, Marker, tooltip, tileLayer } from 'leaflet';
import { DataService } from '../data.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mapa-avistajes',
  templateUrl: './avistajes.component.html',
  styleUrls: ['./avistajes.component.css'],
})

export class AvistajesComponent implements OnInit {
  map: Map;

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 5,
    center: latLng([ -34.0000000 , -64.0000000 ])
  };

  constructor(
    private dataService: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef
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
          }
        );
        m.addTo(this.map);

        const t = tooltip({
          permanent: true,
          direction: 'center',
          offset: [0, 60],
          className: 'text'
        }).setContent(entry.nombrecient).setLatLng( entry.posicion );
        t.addTo(this.map);

        let that = this;
        m.on('click', function() {
            that.dataService.setSelected(entry);
          }
        );
      });
    });
  }
}
