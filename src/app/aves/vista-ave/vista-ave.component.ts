import { Component, OnInit, Input, EventEmitter , Output } from '@angular/core';
import { Ave } from '../ave';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'vista-ave',
  templateUrl: './vista-ave.component.html',
  styleUrls: ['./vista-ave.component.css']
})
export class VistaAveComponent implements OnInit {
  @Input() ave: Ave;
  @Input() showFooter: boolean;
  @Output() propagar = new EventEmitter<Ave>();

  constructor() { }

  ngOnInit() {
  }

  onAdd(ave: Ave) {
    this.propagar.emit(ave);
  }
}
