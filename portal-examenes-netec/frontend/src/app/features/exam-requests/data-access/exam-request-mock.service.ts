import {Injectable} from '@angular/core';
import {Observable, delay, of} from 'rxjs';

/** Flujo temporal para acciones cuyos endpoints todavía no existen en I1. */
@Injectable({providedIn: 'root'})
export class ExamRequestMockService {
  validate(): Observable<{valid: true; simulated: true}> {
    return of({valid: true as const, simulated: true as const}).pipe(delay(300));
  }

  submit(): Observable<{submitted: true; simulated: true}> {
    return of({submitted: true as const, simulated: true as const}).pipe(delay(450));
  }
}
