import { Injectable } from '@angular/core';
import { Observable, from, of, ReplaySubject  } from 'rxjs';
import { Ave } from './aves/ave';

interface AvesEvento {
  ave_select: Ave;
  action: string;
  message: string;
}

@Injectable()
export class AddService {
  current_ave: Ave;
  private messageSource = new ReplaySubject<AvesEvento>(1);
  currentMessage = this.messageSource.asObservable();
  constructor(
  ) { }

  changeMessage(ave: Ave) {
    console.log(ave);
    this.current_ave = ave;
    const evento = {
      ave_select: ave,
      action: 'add',
      message: 'mensaje'
    };
    this.messageSource.next(evento);
    console.log(evento);
  }

  getMensaje() {
    return this.current_ave;
  }
}
