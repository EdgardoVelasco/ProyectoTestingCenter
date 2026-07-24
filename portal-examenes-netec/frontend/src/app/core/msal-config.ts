import {
  BrowserCacheLocation,
  Configuration,
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication
} from '@azure/msal-browser';
import {MsalInterceptorConfiguration} from '@azure/msal-angular';
import {RuntimeConfig} from './runtime-config';

export function createMsalConfiguration(config: RuntimeConfig): Configuration {
  return {
    auth: {
      clientId: config.entraFrontendClientId,
      authority: config.entraAuthority,
      redirectUri: config.entraRedirectUri,
      postLogoutRedirectUri: config.entraRedirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage
    },
    system: {
      allowPlatformBroker: false,
      loggerOptions: {
        piiLoggingEnabled: false
      }
    }
  };
}

export function createMsalInterceptorConfiguration(
  config: RuntimeConfig,
  origin: string = window.location.origin
): MsalInterceptorConfiguration {
  const apiPattern = `${origin}${config.apiBasePath.replace(/\/$/, '')}/*`;
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([[apiPattern, [config.entraBackendScope]]]),
    strictMatching: true
  };
}

export async function initializeMsal(config: RuntimeConfig): Promise<IPublicClientApplication> {
  const instance = new PublicClientApplication(createMsalConfiguration(config));
  await instance.initialize();
  const redirectResult = await instance.handleRedirectPromise();
  const account = redirectResult?.account ?? instance.getActiveAccount() ?? instance.getAllAccounts()[0];
  if (account) {
    instance.setActiveAccount(account);
  }
  return instance;
}
