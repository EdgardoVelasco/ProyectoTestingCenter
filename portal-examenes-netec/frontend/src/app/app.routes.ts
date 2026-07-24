import {Routes} from '@angular/router';
import {AccessDeniedPageComponent} from './access-denied-page.component';
import {authGuard, loginGuard} from './core/auth.guard';
import {LoginPageComponent} from './login-page.component';
import {RequestFormPageComponent} from './request-form-page.component';
import {SessionExpiredPageComponent} from './session-expired-page.component';

export const routes: Routes = [
  {path: 'login', component: LoginPageComponent, canActivate: [loginGuard]},
  {path: 'access-denied', component: AccessDeniedPageComponent},
  {path: 'session-expired', component: SessionExpiredPageComponent},
  {path: 'exam-requests/new', component: RequestFormPageComponent, canActivate: [authGuard]},
  {path: 'exam-requests', redirectTo: 'exam-requests/new', pathMatch: 'full'},
  {path: 'acceso', redirectTo: 'login', pathMatch: 'full'},
  {path: 'acceso-denegado', redirectTo: 'access-denied', pathMatch: 'full'},
  {path: 'solicitudes/nueva', redirectTo: 'exam-requests/new', pathMatch: 'full'},
  {path: '', pathMatch: 'full', redirectTo: 'exam-requests/new'},
  {path: '**', redirectTo: 'exam-requests/new'}
];
