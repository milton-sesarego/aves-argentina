import { Component, OnInit, Input } from '@angular/core';
import { Avistaje } from '../avistaje';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'vista-avistaje',
  templateUrl: './vista-avistaje.component.html',
  styleUrls: ['./vista-avistaje.component.css']
})
export class VistaAvistajeComponent implements OnInit {
  @Input() ave: Avistaje;
  constructor() { }
  ngOnInit() {
  }
}
