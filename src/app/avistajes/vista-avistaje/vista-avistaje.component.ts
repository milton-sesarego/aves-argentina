import {ChangeDetectorRef, Component, OnDestroy, OnInit, Input} from '@angular/core';
import { Avistaje } from '../avistaje';
import {Subscription} from 'rxjs';
import { AvistajesSearchService } from '../avistajes-search.service';
import { AvesSearchService } from '../../aves/aves-search.service';
import { Ave } from '../../aves/ave';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'vista-avistaje',
  templateUrl: './vista-avistaje.component.html',
  styleUrls: ['./vista-avistaje.component.css']
})
export class VistaAvistajeComponent implements OnInit, OnDestroy  {
  private subscription: Subscription;
  avistaje: Avistaje;

  @Input() ave: Ave = null;
  @Input() showFooter: boolean;
  form: FormGroup;
  show = false;

  constructor(
    private dataService: AvistajesSearchService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private avesSearchService: AvesSearchService
    ) {}

  ngOnInit() {
    if (this.ave == null) {
      this.ave = {
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png',
        imagen: '',
        nombrecient: 'MissingNo.',
        nombrecomun: 'MissingNo.',
        familia: 'Null',
        estado: 'Null',
        descripcion: 'Sin descripción',
        link: ''
      };
    }
    this.form = this.fb.group({
      selectedT: []
    });
    this.subscription = this.dataService.getData()
    .subscribe(data => {
      this.avistaje = data;
      this.ave = this.avesSearchService.fetchAve(data.nombrecient);
      this.cdr.detectChanges();
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAdd(ave: Ave) {

  }
}
