import {loadRuntimeConfig, validateRuntimeConfig} from './runtime-config';

const valid = {
  entraTenantId: '00000000-0000-0000-0000-000000000000',
  entraFrontendClientId: '11111111-1111-1111-1111-111111111111',
  entraBackendScope: 'api://22222222-2222-2222-2222-222222222222/ExamRequests.Access',
  entraAuthority: 'https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000',
  entraRedirectUri: 'http://localhost:4200',
  apiBasePath: '/api',
  environmentName: 'development'
};

describe('runtime config', () => {
  it('accepts the public allowlist', () => {
    expect(validateRuntimeConfig(valid).apiBasePath).toBe('/api');
  });

  it('rejects a missing public property without exposing values', () => {
    expect(() => validateRuntimeConfig({...valid, entraTenantId: ''}))
      .toThrowError('RUNTIME_CONFIG_MISSING:entraTenantId');
  });

  it('rejects secret-like properties', () => {
    expect(() => validateRuntimeConfig({...valid, clientSecret: 'do-not-log'}))
      .toThrowError('RUNTIME_CONFIG_FORBIDDEN_KEY:clientSecret');
  });

  it('rejects absolute API paths', () => {
    expect(() => validateRuntimeConfig({...valid, apiBasePath: 'https://backend.invalid/api'}))
      .toThrowError('RUNTIME_CONFIG_INVALID:apiBasePath');
  });

  it('rejects unknown properties', () => {
    expect(() => validateRuntimeConfig({...valid, deprecatedApiUrl: '/api'}))
      .toThrowError('RUNTIME_CONFIG_UNKNOWN_KEY:deprecatedApiUrl');
  });

  it('rejects localhost in production', () => {
    expect(() => validateRuntimeConfig({...valid, environmentName: 'production'}))
      .toThrowError('RUNTIME_CONFIG_LOCALHOST_IN_PRODUCTION');
  });

  it('loads with no-store', async () => {
    const fetcher = jasmine.createSpy('fetch').and.resolveTo(new Response(JSON.stringify(valid)));
    await expectAsync(loadRuntimeConfig(fetcher)).toBeResolved();
    expect(fetcher).toHaveBeenCalledWith('/runtime-config.json', {cache: 'no-store'});
  });
});
