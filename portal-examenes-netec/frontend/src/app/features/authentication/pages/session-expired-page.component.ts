import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from './core/auth.service';

@Component({
  selector: 'app-session-expired-page',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <main class="status-page">
      <section class="access-card" aria-labelledby="expired-title">
        <p class="status-code">Sesión expirada</p>
        <h1 id="expired-title">Vuelve a iniciar sesión</h1>
        <p>Por seguridad bloqueamos las operaciones protegidas. Tus datos temporales podrán recuperarse después de autenticarte.</p>
        <button mat-flat-button color="primary" type="button" (click)="login()">Iniciar sesión con Microsoft</button>
      </section>
    </main>
  `
})
export class SessionExpiredPageComponent {
  private readonly auth = inject(AuthService);
  login(): void { void this.auth.login(); }
}
