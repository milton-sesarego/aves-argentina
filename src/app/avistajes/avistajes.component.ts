import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core'
import { Observable } from 'rxjs';
import { Avistaje } from './avistaje';
import { tileLayer, latLng, marker, Marker } from 'leaflet';
import { HTMLMarkerComponent } from './html-marker.component';
import { AvistajesSearchService } from './avistajes-search.service';

interface MarkerMetaData {
  name: string;
  markerInstance: Marker;
  componentInstance: ComponentRef<HTMLMarkerComponent>
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mapa-avistajes',
  templateUrl: './avistajes.component.html',
  styleUrls: ['./avistajes.component.css'],
})

export class AvistajesComponent implements OnInit{

  @Input() avistajes$: Observable<Avistaje[]>;
  map;
  markers: MarkerMetaData[] = [];
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };

  constructor(private dataService: AvistajesSearchService,
    private resolver: ComponentFactoryResolver, private injector: Injector){}

  ngOnInit(){}

  onMapReady(map) {
    // get a local reference to the map as we need it later
    this.map = map;
  }

  addMarker() {
    // simply iterate over the array of markers from our data service
    // and add them to the map
    for (const entry of this.dataService.getMarkers()) {
      // dynamically instantiate a HTMLMarkerComponent
      const factory = this.resolver.resolveComponentFactory(HTMLMarkerComponent);

      // we need to pass in the dependency injector
      const component = factory.create(this.injector);

      // wire up the @Input() or plain variables (doesn't have to be strictly an @Input())
      component.instance.data = entry;

      // we need to manually trigger change detection on our in-memory component
      // s.t. its template syncs with the data we passed in
      component.changeDetectorRef.detectChanges();

      // create a new Leaflet marker at the given position
      let m = marker(entry.position);

      // pass in the HTML from our dynamic component
      const popupContent = component.location.nativeElement;

      // add popup functionality
      m.bindPopup(popupContent).openPopup();

      // finally add the marker to the map s.t. it is visible
      m.addTo(this.map);

      // add a metadata object into a local array which helps us
      // keep track of the instantiated markers for removing/disposing them later
      this.markers.push({
        name: entry.name,
        markerInstance: m,
        componentInstance: component
      });
    }
  }
}
