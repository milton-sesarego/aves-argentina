import { Component, OnInit, Output } from '@angular/core';
import { AvesSearchService } from '../aves-search.service';
import { Observable } from 'rxjs';
import { Ave } from '../ave';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'buscar-aves',
  templateUrl: './buscar-aves.component.html',
  styleUrls: ['./buscar-aves.component.css']
})
export class BuscarAvesComponent implements OnInit {

  aves$: Observable<Ave[]>;
  constructor(
    private avesSearchService: AvesSearchService
  ) { }

  ngOnInit() {
    this.aves$ = this.avesSearchService.fetchAves();
  }
}
