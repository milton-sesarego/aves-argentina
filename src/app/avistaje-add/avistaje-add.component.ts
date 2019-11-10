import { Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import { AddService } from '../add.service';
import { icon, latLng, Map, marker, tileLayer } from 'leaflet';
import { Ave } from '../aves/ave';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AddAvistajeService } from './add-avistaje.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'avistajes-add',
  templateUrl: './avistaje-add.component.html',
  styleUrls: ['./avistaje-add.component.css'],
})

export class AvistajeAddComponent implements OnInit {
  map;
  myMarker;
  @Input() lat = "latitud";
  @Input() lon = "longitud";
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 5,
    center: latLng([ -34.0000000 , -64.0000000 ])
  };

  markerOptions = {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  };

  @Input() ave: Ave;

  constructor(private addService: AddService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private location: Location,
              private addAvistajeService: AddAvistajeService) {}

  backClicked() {
    this.location.back();
  }

  ngOnInit() {
    this.ave = this.addService.getMensaje();
    if (this.ave == null) {
      this.ave = {
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png',
        imagen: '',
        nombrecient: 'MissingNo.',
        nombrecomun: 'MissingNo.',
        familia: 'Null',
        estado: 'Null',
        descripcion: '',
        link: ''
      };
    }
  }

  addAvistaje() {
    this.addAvistajeService.addAvistaje(this.lat, this.lon, this.ave.nombrecient);
    this.navegar('/avistajes');
  }

  navegar(destino: string) {
    this.router.navigate([destino]);
  }

  onMapReady(map: Map) {
    this.map = map;

    this.map.on('click', e => {
      console.log(e.latlng); // get the coordinates
      if (this.myMarker) { // check
        this.map.removeLayer(this.myMarker); // remove
      }
      this.myMarker = marker([e.latlng.lat, e.latlng.lng], this.markerOptions).addTo(this.map);
      this.lat = e.latlng.lat;
      this.lon = e.latlng.lng;
      this.cdr.detectChanges();
    });
  }

}
