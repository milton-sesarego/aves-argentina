import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ave } from './ave';
import { DataService } from '../data.service';
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

  key: string = 'nombrecient';
  reverse: boolean = false;
  p: number = 1;

  constructor(private dataService: DataService,
              private addService: AddService
    ) {
      this.aves$ = this.dataService.getAves();
    }

  ngOnInit() {
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  procesarRecibido(ave: Ave) {
    this.addService.changeMessage(ave);
  }
}
