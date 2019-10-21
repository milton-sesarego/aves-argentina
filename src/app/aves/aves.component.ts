import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { Ave } from './ave';
import { AvesSearchService } from './aves-search.service';
import { AddService } from '../add.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lista-aves',
  templateUrl: './aves.component.html',
  styleUrls: ['./aves.component.css']
})
export class AvesComponent implements OnInit {
  searchText;
  aves$: Observable<Ave[]>;

  constructor(private avesSearchService: AvesSearchService,
              private addService: AddService
    ) { }

  ngOnInit() {
    this.aves$ = this.avesSearchService.fetchAves();
  }

  navegarAAves() {
  }

  procesarRecibido(ave: Ave) {
    this.addService.changeMessage(ave);
  }
}
