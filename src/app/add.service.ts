import { Injectable } from '@angular/core';
import { Observable, from, of, BehaviorSubject  } from 'rxjs';
import { Ave } from './aves/ave';

@Injectable()
export class AddService {
  ave: Ave;
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(
  ) { }

  changeMessage(ave: Ave) {
    this.ave = ave;
    this.messageSource.next('nuevo');
  }

  getMensaje() {
    return this.ave;
  }
}
