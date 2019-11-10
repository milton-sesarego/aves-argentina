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

  key: string = 'nombrecient';
  reverse: boolean = false;
  p: number = 1;

  constructor(private avesSearchService: AvesSearchService,
              private addService: AddService
    ) { }

  ngOnInit() {
    this.aves$ = this.avesSearchService.fetchAves();
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
/*
  get aves(): Ave[] {
    return this.avesList
      .map((ave, i) =>
        ({id: i + 1, ...ave})
      )
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
*/
  procesarRecibido(ave: Ave) {
    this.addService.changeMessage(ave);
  }
}
