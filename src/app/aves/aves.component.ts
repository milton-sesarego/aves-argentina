import { Component, OnInit, Input , Output} from '@angular/core';
import { Observable } from 'rxjs';
import { Ave } from './ave';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-aves',
  templateUrl: './aves.component.html',
  styleUrls: ['./aves.component.css']
})
export class AvesComponent implements OnInit {
  searchText;

  @Input() aves$: Observable<Ave[]>;

  constructor() { }

  ngOnInit() {
  }

}
