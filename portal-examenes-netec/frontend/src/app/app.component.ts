import {Component, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './core/auth.service';
import {AuthenticatedUserMenuComponent} from './authenticated-user-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatSnackBarModule, AuthenticatedUserMenuComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly auth = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  readonly confirmLogout = signal(false);

  requestLogout(): void {
    if (document.querySelector('form.ng-dirty')) {
      this.confirmLogout.set(true);
      return;
    }
    void this.performLogout();
  }

  logout(): void {
    this.confirmLogout.set(false);
    void this.performLogout();
  }

  private async performLogout(): Promise<void> {
    try {
      await this.auth.logout();
    } catch {
      this.snackBar.open('No fue posible completar el cierre de sesión. Intenta nuevamente.', 'Cerrar', {duration: 5000});
    }
  }
}
