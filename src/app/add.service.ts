import { Injectable } from '@angular/core';
import { Observable, from, of, BehaviorSubject  } from 'rxjs';

@Injectable()
export class AddService {
  mensaje;
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(
  ) { }

  changeMessage(message: string) {
    this.mensaje = message;
    this.messageSource.next(message);
  }

  getMensaje() {
    return this.mensaje;
  }
}
