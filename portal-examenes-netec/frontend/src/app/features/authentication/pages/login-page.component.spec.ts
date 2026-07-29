import {TestBed} from '@angular/core/testing';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {AuthService} from './core/auth.service';
import {LoginPageComponent} from './login-page.component';

describe('LoginPageComponent', () => {
  const auth = {
    state: () => 'UNAUTHENTICATED',
    login: jasmine.createSpy('login').and.resolveTo()
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [LoginPageComponent],
    providers: [provideNoopAnimations(), {provide: AuthService, useValue: auth}]
  }));

  it('muestra login Microsoft sin campos de contraseña y acceso externo deshabilitado', () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Iniciar sesión con Microsoft');
    expect(element.querySelector('input[type="password"]')).toBeNull();
    const external = Array.from(element.querySelectorAll('button'))
      .find(button => button.textContent?.includes('Acceso externo'));
    expect(external?.disabled).toBeTrue();
  });

  it('invoca login redirect desde el botón principal', () => {
    auth.login.calls.reset();
    const fixture = TestBed.createComponent(LoginPageComponent);
    fixture.detectChanges();
    const button = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button'))
      .find(candidate => candidate.textContent?.includes('Iniciar sesión con Microsoft'))!;
    button.click();
    expect(auth.login).toHaveBeenCalled();
  });
});
