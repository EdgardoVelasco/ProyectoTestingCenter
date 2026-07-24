import {InjectionToken} from '@angular/core';

export interface RuntimeConfig {
  entraTenantId: string;
  entraFrontendClientId: string;
  entraBackendScope: string;
  entraAuthority: string;
  entraRedirectUri: string;
  apiBasePath: string;
  environmentName: string;
}

export const RUNTIME_CONFIG = new InjectionToken<RuntimeConfig>('RUNTIME_CONFIG');

const requiredKeys: ReadonlyArray<keyof RuntimeConfig> = [
  'entraTenantId',
  'entraFrontendClientId',
  'entraBackendScope',
  'entraAuthority',
  'entraRedirectUri',
  'apiBasePath',
  'environmentName'
];

const forbiddenKey = /(secret|password|private.?key|database.?url|database.?user|database.?name|access.?token|refresh.?token|graph.?credential)/i;

export async function loadRuntimeConfig(fetcher: typeof fetch = fetch): Promise<RuntimeConfig> {
  const response = await fetcher('/runtime-config.json', {cache: 'no-store'});
  if (!response.ok) {
    throw new Error(`RUNTIME_CONFIG_HTTP_${response.status}`);
  }
  return validateRuntimeConfig(await response.json());
}

export function validateRuntimeConfig(value: unknown): RuntimeConfig {
  if (!isRecord(value)) {
    throw new Error('RUNTIME_CONFIG_INVALID_OBJECT');
  }

  const forbidden = Object.keys(value).find(key => forbiddenKey.test(key));
  if (forbidden) {
    throw new Error(`RUNTIME_CONFIG_FORBIDDEN_KEY:${forbidden}`);
  }

  const unknown = Object.keys(value).find(key => !requiredKeys.includes(key as keyof RuntimeConfig));
  if (unknown) {
    throw new Error(`RUNTIME_CONFIG_UNKNOWN_KEY:${unknown}`);
  }

  for (const key of requiredKeys) {
    if (typeof value[key] !== 'string' || value[key].trim() === '') {
      throw new Error(`RUNTIME_CONFIG_MISSING:${key}`);
    }
  }

  const config = value as unknown as RuntimeConfig;
  if (!/^\/(?!\/)/.test(config.apiBasePath) || /^https?:/i.test(config.apiBasePath)) {
    throw new Error('RUNTIME_CONFIG_INVALID:apiBasePath');
  }
  if (!isHttpUrl(config.entraRedirectUri)) {
    throw new Error('RUNTIME_CONFIG_INVALID:entraRedirectUri');
  }
  if (!isHttpsUrl(config.entraAuthority)) {
    throw new Error('RUNTIME_CONFIG_INVALID:entraAuthority');
  }
  if (/^(production|prod)$/i.test(config.environmentName) &&
      (containsLocalhost(config.entraRedirectUri) || containsLocalhost(config.entraAuthority))) {
    throw new Error('RUNTIME_CONFIG_LOCALHOST_IN_PRODUCTION');
  }

  return Object.freeze({...config});
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isHttpUrl(value: string): boolean {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function containsLocalhost(value: string): boolean {
  try {
    const hostname = new URL(value).hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
  } catch {
    return true;
  }
}
