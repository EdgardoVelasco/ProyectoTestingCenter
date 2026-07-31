import {TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {SubmissionSuccessDialogComponent} from './submission-success-dialog.component';

describe('SubmissionSuccessDialogComponent', () => {
  it('muestra título, folio y estado sin afirmar entrega efectiva', () => {
    TestBed.configureTestingModule({
      imports: [SubmissionSuccessDialogComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {folio: 'request-1', status: 'PENDIENTE_NOTIFICACION'}},
        provideNoopAnimations()
      ]
    });
    const fixture = TestBed.createComponent(SubmissionSuccessDialogComponent);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Solicitud enviada');
    expect(text).toContain('request-1');
    expect(text).toContain('PENDIENTE_NOTIFICACION');
    expect(text).toContain('asíncrona');
  });
});
