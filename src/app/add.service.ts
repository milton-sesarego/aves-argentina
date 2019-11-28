import { Injectable } from '@angular/core';
import { Observable, from, of, ReplaySubject  } from 'rxjs';
import { Ave } from './aves/ave';

interface AvesEvento {
  action: string;
}

@Injectable()
export class AddService {
  currentAve: Ave;
  private messageSource = new ReplaySubject<AvesEvento>(1);
  currentMessage = this.messageSource.asObservable();
  constructor(
  ) { }

  changeMessage(ave: Ave) {
    this.currentAve = ave;
    const evento = {
      action: 'add',
    };
    this.messageSource.next(evento);
  }

  getMensaje() {
    return this.currentAve;
  }
}
