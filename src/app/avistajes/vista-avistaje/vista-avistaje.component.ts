import {ChangeDetectorRef, Component, OnDestroy, OnInit, Input} from '@angular/core';
import { Avistaje } from '../avistaje';
import {Subscription} from 'rxjs';
import { DataService } from '../../data.service';
import { Ave } from '../../aves/ave';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'vista-avistaje',
  templateUrl: './vista-avistaje.component.html',
  styleUrls: ['./vista-avistaje.component.css']
})
export class VistaAvistajeComponent implements OnInit, OnDestroy  {
  private subscription: Subscription;
  avistaje: Avistaje;
  notNull = false;
  ave = {
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png',
    imagen: '',
    nombrecient: 'MissingNo.',
    nombrecomun: 'MissingNo.',
    familia: 'Null',
    estado: 'Null',
    descripcion: 'Sin descripción',
    link: ''
  };
  show = false;

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.subscription = this.dataService.getData()
    .subscribe(data => {
      this.notNull = true;
      this.avistaje = data.avistaje;
      this.ave = data.ave;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
