import {signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {By} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AuthenticatedUserMenuComponent} from './core/layout/authenticated-user-menu.component';
import {AuthService} from './core/auth.service';

describe('AppComponent header', () => {
  const logout = jasmine.createSpy('logout').and.resolveTo();
  const auth = {
    authenticated: signal(true),
    identity: signal({name: 'Ana Ventas', username: 'ana@netec.com'}),
    state: signal('AUTHENTICATED'),
    logout
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppComponent],
    providers: [
      provideNoopAnimations(),
      {provide: AuthService, useValue: auth},
      provideRouter([])
    ]
  }));

  it('muestra el menú de usuario con identidad permanente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.user-menu-trigger') as HTMLButtonElement;
    expect(button.textContent).toContain('Ana Ventas');
    expect(button.textContent).toContain('ana@netec.com');
    expect(button.querySelector('mat-icon')).not.toBeNull();
    expect(button.getAttribute('aria-label')).toContain('menú de usuario');
  });

  it('delega la solicitud del menú a la misma acción funcional de logout', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.debugElement.query(By.directive(AuthenticatedUserMenuComponent))
      .componentInstance.logoutRequested.emit();
    await fixture.whenStable();
    expect(logout).toHaveBeenCalled();
  });
});
