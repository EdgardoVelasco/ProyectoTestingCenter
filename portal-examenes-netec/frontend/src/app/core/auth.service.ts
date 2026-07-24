import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {computed, Inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import {MsalService} from '@azure/msal-angular';
import {RedirectRequest} from '@azure/msal-browser';
import {firstValueFrom} from 'rxjs';
import {RUNTIME_CONFIG, RuntimeConfig} from './runtime-config';
import {RequestRecoveryService} from './request-recovery.service';

export type AuthenticationState =
  'UNAUTHENTICATED' | 'REDIRECTING' | 'AUTHENTICATING' | 'AUTHENTICATED' |
  'SESSION_RESTORING' | 'SESSION_EXPIRED' | 'ACCESS_DENIED' |
  'AUTHENTICATION_ERROR' | 'LOGGING_OUT';

export interface AuthenticatedIdentity {
  subject: string;
  objectId?: string | null;
  name: string;
  username: string;
  tenantId: string;
  scopes: string[];
  roles: string[];
  area?: string | null;
  businessUnit?: string | null;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly stateSignal = signal<AuthenticationState>('SESSION_RESTORING');
  private readonly identitySignal = signal<AuthenticatedIdentity | null>(null);
  private initialization?: Promise<boolean>;

  readonly state = this.stateSignal.asReadonly();
  readonly identity = this.identitySignal.asReadonly();
  readonly authenticated = computed(() => this.stateSignal() === 'AUTHENTICATED');
  readonly developmentTenantAuthorization: boolean;

  constructor(
    private readonly http: HttpClient,
    private readonly msal: MsalService,
    private readonly router: Router,
    private readonly recovery: RequestRecoveryService,
    @Inject(RUNTIME_CONFIG) private readonly runtime: RuntimeConfig
  ) {
    this.developmentTenantAuthorization = /^development$/i.test(runtime.environmentName);
  }

  initialize(): Promise<boolean> {
    this.initialization ??= this.restoreSession();
    return this.initialization;
  }

  async login(): Promise<void> {
    if (this.stateSignal() === 'SESSION_EXPIRED') this.recovery.capture();
    this.stateSignal.set('REDIRECTING');
    const request: RedirectRequest = {scopes: [this.runtime.entraBackendScope]};
    await firstValueFrom(this.msal.loginRedirect(request));
  }

  async logout(): Promise<void> {
    this.stateSignal.set('LOGGING_OUT');
    this.identitySignal.set(null);
    this.recovery.clear();
    this.msal.instance.setActiveAccount(null);
    const loginUri = new URL('/login', this.runtime.entraRedirectUri).toString();
    try {
      await firstValueFrom(this.msal.logoutRedirect({postLogoutRedirectUri: loginUri}));
    } catch (error) {
      this.stateSignal.set('AUTHENTICATION_ERROR');
      throw error;
    }
  }

  markSessionExpired(): void {
    this.stateSignal.set('SESSION_EXPIRED');
  }

  private async restoreSession(): Promise<boolean> {
    this.stateSignal.set('SESSION_RESTORING');
    if (!this.msal.instance.getActiveAccount()) {
      this.stateSignal.set('UNAUTHENTICATED');
      return false;
    }
    try {
      const identity = await firstValueFrom(
        this.http.get<AuthenticatedIdentity>(`${this.runtime.apiBasePath.replace(/\/$/, '')}/auth/me`)
      );
      const allowed = this.developmentTenantAuthorization ||
        identity.roles.some(role => role === 'EXAM_SALES' || role === 'EXAM_ADMIN');
      if (!allowed) {
        this.identitySignal.set(identity);
        this.stateSignal.set('ACCESS_DENIED');
        await this.router.navigateByUrl('/acceso-denegado');
        return false;
      }
      this.identitySignal.set(identity);
      this.stateSignal.set('AUTHENTICATED');
      return true;
    } catch (error: unknown) {
      this.identitySignal.set(null);
      if (error instanceof HttpErrorResponse && error.status === 403) {
        this.stateSignal.set('ACCESS_DENIED');
        await this.router.navigateByUrl('/acceso-denegado');
      } else if (error instanceof HttpErrorResponse && error.status === 401) {
        this.stateSignal.set('SESSION_EXPIRED');
        await this.router.navigateByUrl('/session-expired');
      } else {
        this.stateSignal.set('AUTHENTICATION_ERROR');
      }
      return false;
    }
  }
}
