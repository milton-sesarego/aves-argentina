import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Ave } from '../ave';

@Component({
  selector: 'lista-aves',
  templateUrl: './lista-aves.component.html',
  styleUrls: ['./lista-aves.component.css']
})
export class ListaAvesComponent implements OnInit {

  @Input() aves$: Observable<Ave[]>;
  constructor() { }

  ngOnInit() {
  }

}