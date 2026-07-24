import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {MsalService} from '@azure/msal-angular';
import {of} from 'rxjs';
import {AuthService} from './auth.service';
import {RequestRecoveryService} from './request-recovery.service';
import {RUNTIME_CONFIG} from './runtime-config';

describe('AuthService with Entra development tenant', () => {
  const activeAccount = {homeAccountId: 'home'};
  const loginRedirect = jasmine.createSpy('loginRedirect').and.returnValue(of(undefined));
  const logoutRedirect = jasmine.createSpy('logoutRedirect').and.returnValue(of(undefined));
  const msal = {
    instance: {getActiveAccount: () => activeAccount, setActiveAccount: jasmine.createSpy('setActiveAccount')},
    loginRedirect,
    logoutRedirect
  };
  const router = {navigateByUrl: jasmine.createSpy('navigateByUrl').and.resolveTo(true)};

  beforeEach(() => {
    loginRedirect.calls.reset();
    logoutRedirect.calls.reset();
    router.navigateByUrl.calls.reset();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
        RequestRecoveryService,
        {provide: MsalService, useValue: msal},
        {provide: Router, useValue: router},
        {provide: RUNTIME_CONFIG, useValue: {
          entraTenantId: 'tenant',
          entraFrontendClientId: 'frontend',
          entraBackendScope: 'api://backend/ExamRequests.Access',
          entraAuthority: 'https://login.microsoftonline.com/tenant',
          entraRedirectUri: 'http://localhost:4200',
          apiBasePath: '/api',
          environmentName: 'development'
        }}
      ]
    });
  });

  it('inicia login redirect con el scope de la API', async () => {
    const service = TestBed.inject(AuthService);
    await service.login();
    expect(loginRedirect).toHaveBeenCalledWith({
      scopes: ['api://backend/ExamRequests.Access']
    });
  });

  it('acepta en development una identidad del tenant sin App Role definitivo', async () => {
    const service = TestBed.inject(AuthService);
    const result = service.initialize();
    TestBed.inject(HttpTestingController).expectOne('/api/auth/me').flush({
      subject: 'sub', objectId: 'oid', name: 'Usuario Tenant',
      username: 'usuario@nwr1.onmicrosoft.com', tenantId: 'tenant',
      scopes: ['ExamRequests.Access'], roles: []
    });
    expect(await result).toBeTrue();
    expect(service.identity()?.name).toBe('Usuario Tenant');
  });

  it('logout usa redirect y vuelve a /login', async () => {
    const service = TestBed.inject(AuthService);
    await service.logout();
    expect(logoutRedirect).toHaveBeenCalledWith({
      postLogoutRedirectUri: 'http://localhost:4200/login'
    });
  });
});
