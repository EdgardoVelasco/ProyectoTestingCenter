import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthService} from '../../../core/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule],
  template: `
    <main class="access-page">
      <section class="access-card" aria-labelledby="access-title">
        <div class="brand-mark" aria-label="NETEC">NETEC</div>
        <p class="eyebrow">Testing Center</p>
        <h1 id="access-title">Acceso al Portal de Registro de Exámenes NETEC</h1>
        <p>Inicia sesión con tu identidad corporativa para registrar y consultar solicitudes de examen.</p>
        <p class="restricted-note">Acceso restringido a personal autorizado de NETEC.</p>
        @if (auth.state() === 'AUTHENTICATION_ERROR') {
          <div class="error-summary" role="alert">No fue posible iniciar sesión. Intenta nuevamente o contacta a soporte.</div>
        }
        <button mat-flat-button color="primary" type="button" (click)="signIn()"
          [disabled]="redirecting()" autofocus>
          @if (redirecting()) { <mat-spinner diameter="18"></mat-spinner> }
          Iniciar sesión con Microsoft
        </button>
        <button mat-stroked-button type="button" disabled aria-describedby="external-help">Acceso externo</button>
        <p id="external-help" class="helper-text">Disponible próximamente.</p>
        <p class="support-text">Si necesitas acceso, comunícate con el equipo de soporte interno.</p>
      </section>
    </main>
  `
})
export class LoginPageComponent {
  readonly auth = inject(AuthService);
  readonly redirecting = () => ['REDIRECTING', 'AUTHENTICATING', 'SESSION_RESTORING'].includes(this.auth.state());
  signIn(): void { void this.auth.login(); }
}
