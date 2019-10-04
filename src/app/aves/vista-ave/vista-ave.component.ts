import { Component, OnInit, Input } from '@angular/core';
import { Ave } from '../ave';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vista-ave',
  templateUrl: './vista-ave.component.html',
  styleUrls: ['./vista-ave.component.css']
})
export class VistaAveComponent implements OnInit {
  @Input() ave: Ave;
  faEye = faEye;
  constructor() { }
  ngOnInit() {
  }
}