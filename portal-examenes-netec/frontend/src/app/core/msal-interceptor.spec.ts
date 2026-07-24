import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalInterceptor,
  MsalService
} from '@azure/msal-angular';
import {of} from 'rxjs';
import {createMsalInterceptorConfiguration} from './msal-config';
import {RuntimeConfig} from './runtime-config';

const runtimeConfig: RuntimeConfig = {
  entraTenantId: '00000000-0000-0000-0000-000000000000',
  entraFrontendClientId: '11111111-1111-1111-1111-111111111111',
  entraBackendScope: 'api://22222222-2222-2222-2222-222222222222/ExamRequests.Access',
  entraAuthority: 'https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000',
  entraRedirectUri: 'http://localhost:9876',
  apiBasePath: '/api',
  environmentName: 'test'
};

describe('MSAL API interceptor', () => {
  const acquireTokenSilent = jasmine.createSpy('acquireTokenSilent');

  beforeEach(() => {
    acquireTokenSilent.calls.reset();
    acquireTokenSilent.and.returnValue(of({accessToken: 'test-access-token'}));
    const logger = {
      verbose: () => undefined,
      info: () => undefined,
      infoPii: () => undefined,
      warning: () => undefined,
      error: () => undefined
    };
    const msalService = {
      instance: {
        getActiveAccount: () => ({homeAccountId: 'account'}),
        getAllAccounts: () => []
      },
      acquireTokenSilent,
      getLogger: () => logger
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {
          provide: MSAL_INTERCEPTOR_CONFIG,
          useValue: createMsalInterceptorConfiguration(runtimeConfig, window.location.origin)
        },
        {provide: MsalService, useValue: msalService},
        {provide: MsalBroadcastService, useValue: {inProgress$: of('none')}},
        {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true}
      ]
    });
  });

  it('adjunta bearer y solicita el scope aprobado para una ruta relativa /api', () => {
    const http = TestBed.inject(HttpClient);
    const controller = TestBed.inject(HttpTestingController);

    http.get('/api/auth/me').subscribe();
    const request = controller.expectOne('/api/auth/me');

    expect(request.request.headers.get('Authorization')).toBe('Bearer test-access-token');
    expect(acquireTokenSilent).toHaveBeenCalledWith(jasmine.objectContaining({
      scopes: [runtimeConfig.entraBackendScope]
    }));
    request.flush({});
    controller.verify();
  });

  it('no adjunta bearer ni solicita token para un origen externo', () => {
    const http = TestBed.inject(HttpClient);
    const controller = TestBed.inject(HttpTestingController);

    http.get('https://external.test/resource').subscribe();
    const request = controller.expectOne('https://external.test/resource');

    expect(request.request.headers.has('Authorization')).toBeFalse();
    expect(acquireTokenSilent).not.toHaveBeenCalled();
    request.flush({});
    controller.verify();
  });
});
