import {TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {ConfirmationData, ConfirmationDialogComponent} from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  it('presenta solicitante, empresa, examen, participantes y total antes de confirmar', () => {
    const data: ConfirmationData = {
      requester: 'Ana Ventas', company: 'NETEC', participants: 2,
      exams: [{name: 'Microsoft Azure Fundamentals', quantity: 2, subtotal: 118, currency: 'USD'}],
      total: 118, currency: 'USD', billingReference: 'OF-1'
    };
    TestBed.configureTestingModule({
      imports: [ConfirmationDialogComponent],
      providers: [{provide: MAT_DIALOG_DATA, useValue: data}, provideNoopAnimations()]
    });
    const fixture = TestBed.createComponent(ConfirmationDialogComponent);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    ['Confirmar envío a Facturación', 'Ana Ventas', 'NETEC', 'Microsoft Azure Fundamentals', '118', 'OF-1']
      .forEach(value => expect(text).toContain(value));
  });
});
