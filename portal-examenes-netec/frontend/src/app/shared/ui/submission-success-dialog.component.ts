import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

export interface SubmissionSuccessData {
  folio: string;
  status: string;
}

@Component({
  selector: 'app-submission-success-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Solicitud enviada</h2>
    <mat-dialog-content>
      <p>La solicitud fue registrada correctamente y enviada al proceso de Facturación.</p>
      <p><strong>Folio:</strong> {{ data.folio }}</p>
      <p class="status-note">Estado inicial: {{ data.status }}. La entrega efectiva del correo se procesa de forma asíncrona.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-flat-button color="primary" [mat-dialog-close]="true">Crear otra solicitud</button>
    </mat-dialog-actions>
  `
})
export class SubmissionSuccessDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: SubmissionSuccessData) {}
}
