import { Component, OnInit, Output } from '@angular/core';
import { AvesSearchService } from '../aves-search.service';
import { Observable } from 'rxjs';
import { Ave } from '../ave';

@Component({
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
    this.fetchAves();
  }

  fetchAves(){
    this.aves$ = this.avesSearchService.fetchAves();
    //this.avesSearchService.addAvistaje();
  }
}
