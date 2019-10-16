import { Component, OnInit, OnDestroy, Input, Output, EventEmitter  } from '@angular/core'
import { Observable } from 'rxjs';
import { Avistaje } from './avistaje';
import { AvistajesSearchService } from './avistajes-search.service';
import { marker } from './marker.image';
import { proj, View } from 'openlayers';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mapa-avistajes',
  templateUrl: './avistajes.component.html',
  styleUrls: ['./avistajes.component.css'],
})

export class AvistajesComponent implements OnInit {

  @Input() avistajes$: Observable<Avistaje[]>;

  @Input()
  latitude = -34.0000000
  @Input()
  longitude = -64.0000000
  @Input()
  latitudePointer = -34.0000000
  @Input()
  longitudePointer = -64.0000000
  @Input()
  showControlsZoom: boolean
  @Input()
  titleZoomIn = 'Zoom in'
  @Input()
  titleZoomOut = 'Zoom out'
  @Input()
  opacity = 1
  @Input()
  zoom = 8
  markerImage = marker

  constructor(private dataService: AvistajesSearchService,
    ) {}

  ngOnInit() {
    console.log("asd")
  }

  increaseZoom() {
    this.zoom++
  }
  decreaseZoom() {
    this.zoom--
  }
}
