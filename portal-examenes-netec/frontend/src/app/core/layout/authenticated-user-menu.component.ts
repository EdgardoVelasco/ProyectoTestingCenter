import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-authenticated-user-menu',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule],
  template: `
    <button
      #menuTrigger="matMenuTrigger"
      class="user-menu-trigger"
      type="button"
      [matMenuTriggerFor]="userMenu"
      [disabled]="loading"
      aria-label="Abrir menú de usuario">
      <span class="user-avatar" aria-hidden="true">
        @if (initials) {
          {{initials}}
        } @else {
          <mat-icon fontSet="material-symbols-outlined">person</mat-icon>
        }
      </span>
      <span class="user-menu-identity">
        <strong>{{loading ? 'Cargando identidad…' : displayName}}</strong>
        <small>{{loading ? 'Espera un momento' : displayUsername}}</small>
      </span>
      <mat-icon
        class="user-menu-expand"
        [class.is-open]="menuTrigger.menuOpen"
        fontSet="material-symbols-outlined"
        aria-hidden="true"></mat-icon>
    </button>

    <mat-menu #userMenu="matMenu" xPosition="before" class="authenticated-user-menu">
      <div class="user-menu-summary" role="presentation" (click)="$event.stopPropagation()">
        <strong>{{displayName}}</strong>
        <span>{{displayUsername}}</span>
      </div>
      <mat-divider></mat-divider>
      <button mat-menu-item type="button" [disabled]="loggingOut" (click)="logoutRequested.emit()">
        <span>{{loggingOut ? 'Cerrando sesión…' : 'Cerrar sesión'}}</span>
      </button>
    </mat-menu>
  `
})
export class AuthenticatedUserMenuComponent {
  @Input() name = '';
  @Input() username = '';
  @Input() loading = false;
  @Input() loggingOut = false;
  @Output() readonly logoutRequested = new EventEmitter<void>();

  get displayName(): string {
    return this.name.trim() || 'Usuario';
  }

  get displayUsername(): string {
    return this.username || 'No disponible';
  }

  get initials(): string {
    const parts = this.name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '';
    const last = parts.length > 1 ? parts.at(-1)! : '';
    return `${parts[0][0]}${last ? last[0] : ''}`.toUpperCase();
  }
}
