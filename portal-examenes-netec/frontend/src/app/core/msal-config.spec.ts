import {BrowserCacheLocation, InteractionType} from '@azure/msal-browser';
import {createMsalConfiguration, createMsalInterceptorConfiguration} from './msal-config';
import {RuntimeConfig} from './runtime-config';

const runtimeConfig: RuntimeConfig = {
  entraTenantId: '00000000-0000-0000-0000-000000000000',
  entraFrontendClientId: '11111111-1111-1111-1111-111111111111',
  entraBackendScope: 'api://22222222-2222-2222-2222-222222222222/ExamRequests.Access',
  entraAuthority: 'https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000',
  entraRedirectUri: 'https://portal.netec.test',
  apiBasePath: '/api',
  environmentName: 'test'
};

describe('MSAL runtime configuration', () => {
  it('construye la configuración pública sin secretos y con almacenamiento de sesión', () => {
    const config = createMsalConfiguration(runtimeConfig);

    expect(config.auth.clientId).toBe(runtimeConfig.entraFrontendClientId);
    expect(config.auth.authority).toBe(runtimeConfig.entraAuthority);
    expect(config.auth.redirectUri).toBe(runtimeConfig.entraRedirectUri);
    expect(config.cache?.cacheLocation).toBe(BrowserCacheLocation.SessionStorage);
    expect(JSON.stringify(config).toLowerCase()).not.toContain('clientsecret');
  });

  it('protege únicamente el API del mismo origen mediante coincidencia estricta', () => {
    const config = createMsalInterceptorConfiguration(runtimeConfig, 'https://portal.netec.test');

    expect(config.interactionType).toBe(InteractionType.Redirect);
    expect(config.strictMatching).toBeTrue();
    expect(config.protectedResourceMap.get('https://portal.netec.test/api/*'))
      .toEqual([runtimeConfig.entraBackendScope]);
    expect(config.protectedResourceMap.has('https://graph.microsoft.com/*')).toBeFalse();
    expect(config.protectedResourceMap.has('https://external.test/*')).toBeFalse();
  });

  it('normaliza una barra final en la ruta base', () => {
    const config = createMsalInterceptorConfiguration(
      {...runtimeConfig, apiBasePath: '/api/'},
      'https://portal.netec.test'
    );

    expect([...config.protectedResourceMap.keys()]).toEqual(['https://portal.netec.test/api/*']);
  });

  it('protege /api también en development porque development usa Entra real', () => {
    const config = createMsalInterceptorConfiguration(
      {...runtimeConfig, environmentName: 'development'},
      'http://localhost:4200'
    );

    expect(config.protectedResourceMap.get('http://localhost:4200/api/*'))
      .toEqual([runtimeConfig.entraBackendScope]);
  });
});
