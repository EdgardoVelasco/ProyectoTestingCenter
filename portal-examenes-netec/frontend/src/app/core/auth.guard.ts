import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './auth.service';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const authenticated = await auth.initialize();
  if (authenticated) return true;
  if (auth.state() === 'ACCESS_DENIED') return router.createUrlTree(['/access-denied']);
  if (auth.state() === 'SESSION_EXPIRED') return router.createUrlTree(['/session-expired']);
  return router.createUrlTree(['/login']);
};

export const loginGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return await auth.initialize() ? router.createUrlTree(['/exam-requests/new']) : true;
};
