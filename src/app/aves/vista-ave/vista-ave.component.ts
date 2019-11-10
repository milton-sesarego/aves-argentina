import { Component, OnInit, Input, EventEmitter , Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Ave } from '../ave';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'vista-ave',
  templateUrl: './vista-ave.component.html',
  styleUrls: ['./vista-ave.component.css']
})
export class VistaAveComponent implements OnInit {
  @Input() ave: Ave;
  @Input() showFooter: boolean;
  @Output() propagar = new EventEmitter<Ave>();
  form: FormGroup;
  show = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      selectedT: []
    });
  }

  onAdd(ave: Ave) {
    this.propagar.emit(ave);
  }
}
