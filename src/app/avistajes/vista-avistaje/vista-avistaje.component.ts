import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Avistaje } from '../avistaje';
import {Subscription} from 'rxjs';
import { AvistajesSearchService } from '../avistajes-search.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'vista-avistaje',
  templateUrl: './vista-avistaje.component.html',
  styleUrls: ['./vista-avistaje.component.css']
})
export class VistaAvistajeComponent implements OnInit, OnDestroy  {
  private subscription: Subscription;
  avistaje: Avistaje;

  constructor(
    private dataService: AvistajesSearchService,
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.subscription = this.dataService.getData()
    .subscribe(data => {
      console.log(data);
      this.avistaje = data;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
