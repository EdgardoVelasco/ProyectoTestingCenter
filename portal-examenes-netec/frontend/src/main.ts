import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalInterceptor,
  MsalService
} from '@azure/msal-angular';
import {AppComponent} from './app/app.component';
import {routes} from './app/app.routes';
import {correlationInterceptor} from './app/core/correlation.interceptor';
import {createMsalInterceptorConfiguration, initializeMsal} from './app/core/msal-config';
import {loadRuntimeConfig, RUNTIME_CONFIG} from './app/core/runtime-config';

void startApplication();

async function startApplication(): Promise<void> {
  try {
    const runtimeConfig = await loadRuntimeConfig();
    const msalInstance = await initializeMsal(runtimeConfig);
    const msalInterceptorConfig = createMsalInterceptorConfiguration(runtimeConfig);
    await bootstrapApplication(AppComponent, {
      providers: [
        {provide: RUNTIME_CONFIG, useValue: runtimeConfig},
        {provide: MSAL_INSTANCE, useValue: msalInstance},
        {provide: MSAL_INTERCEPTOR_CONFIG, useValue: msalInterceptorConfig},
        {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true},
        MsalService,
        MsalBroadcastService,
        provideRouter(routes),
        provideHttpClient(withInterceptors([correlationInterceptor]), withInterceptorsFromDi()),
        provideAnimationsAsync()
      ]
    });
  } catch (error: unknown) {
    showConfigurationError(error);
  }
}

function showConfigurationError(error: unknown): void {
  const code = error instanceof Error ? error.message : 'RUNTIME_CONFIG_UNKNOWN_ERROR';
  console.error('Application configuration failed:', code);
  const container = document.createElement('main');
  container.setAttribute('role', 'alert');
  const title = document.createElement('h1');
  title.textContent = 'No fue posible iniciar la aplicación';
  const detail = document.createElement('p');
  detail.textContent = `La configuración del ambiente no es válida. Código: ${code}`;
  container.append(title, detail);
  document.body.replaceChildren(container);
}
