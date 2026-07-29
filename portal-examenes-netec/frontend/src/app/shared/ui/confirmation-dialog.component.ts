import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CurrencyPipe} from '@angular/common';

export interface ConfirmationData {
  requester: string;
  company: string;
  exams: {name: string; quantity: number; subtotal: number; currency: string}[];
  participants: number;
  total: number;
  currency: string;
  billingReference: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CurrencyPipe],
  template: `
    <h2 mat-dialog-title>Confirmar envío a Facturación</h2>
    <mat-dialog-content>
      <p>Revisa la información antes de continuar. Esta acción es una simulación de desarrollo.</p>
      <dl class="confirmation-grid">
        <div><dt>Solicitante</dt><dd>{{data.requester}}</dd></div>
        <div><dt>Empresa</dt><dd>{{data.company}}</dd></div>
        <div><dt>Participantes</dt><dd>{{data.participants}}</dd></div>
        <div><dt>Referencia</dt><dd>{{data.billingReference || 'Sin referencia'}}</dd></div>
      </dl>
      <h3>Exámenes</h3>
      @for (exam of data.exams; track exam.name) {
        <p>{{exam.name}} · {{exam.quantity}} · {{exam.subtotal | currency:exam.currency:'symbol-narrow':'1.2-2'}}</p>
      }
      <p class="dialog-total">Total: {{data.total | currency:data.currency:'symbol-narrow':'1.2-2'}} {{data.currency}}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Volver</button>
      <button mat-flat-button color="primary" [mat-dialog-close]="true">Confirmar envío</button>
    </mat-dialog-actions>
  `
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: ConfirmationData) {}
}
