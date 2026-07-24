import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthenticatedIdentity} from './auth.service';
import {RUNTIME_CONFIG, RuntimeConfig} from './runtime-config';

export interface Requester {
  id: string;
  name: string;
  email: string;
  area?: string;
  businessUnit?: string;
}

export interface Draft {
  id: string;
  status: 'BORRADOR';
  requester: Requester;
  salesAdvisor: {id: string; name: string; userPrincipalName: string};
  scheduledCourseCode?: string;
  companyNameSnapshot?: string;
  billingReference?: string;
  observations?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface DraftInput {
  scheduledCourseCode: string | null;
  companyName: string | null;
  billingReference: string | null;
  observations: string | null;
  participants: Array<{id: string; firstName: string; lastName: string; secondLastName: string | null; email: string}>;
  examAssignments: Array<{examCatalogId: string; participantIds: string[]}>;
}

@Injectable({providedIn: 'root'})
export class ExamRequestApi {
  private readonly apiBase: string;
  private readonly requestsBase: string;

  constructor(
    private readonly http: HttpClient,
    @Inject(RUNTIME_CONFIG) runtimeConfig: RuntimeConfig
  ) {
    this.apiBase = runtimeConfig.apiBasePath.replace(/\/$/, '');
    this.requestsBase = `${this.apiBase}/v1/exam-requests`;
  }

  me(): Observable<Requester> {
    return this.http.get<AuthenticatedIdentity>(`${this.apiBase}/auth/me`).pipe(
      map(identity => ({
        id: identity.objectId || identity.subject,
        name: identity.name,
        email: identity.username,
        area: identity.area ?? undefined,
        businessUnit: identity.businessUnit ?? undefined
      }))
    );
  }

  create(body: DraftInput): Observable<Draft> {
    return this.http.post<Draft>(this.requestsBase, body);
  }

  update(id: string, version: number, body: DraftInput): Observable<Draft> {
    return this.http.put<Draft>(`${this.requestsBase}/${id}`, body, {
      headers: new HttpHeaders({'If-Match': `"${version}"`})
    });
  }
}
