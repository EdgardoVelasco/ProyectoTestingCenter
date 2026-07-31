import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../../core/auth.service';

@Component({
  selector: 'app-access-denied-page',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <main class="status-page">
      <section class="access-card" aria-labelledby="denied-title">
        <p class="status-code">403</p>
        <h1 id="denied-title">Tu cuenta no tiene acceso al portal</h1>
        <p>La sesión es válida, pero no cuenta con la autorización requerida. Contacta a soporte si consideras que se trata de un error.</p>
        <button mat-flat-button color="primary" type="button" (click)="logout()">Cerrar sesión</button>
      </section>
    </main>
  `
})
export class AccessDeniedPageComponent {
  private readonly auth = inject(AuthService);
  logout(): void { void this.auth.logout(); }
}
