import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {RequestFormPageComponent} from './request-form-page.component';
import {CatalogMockService} from '../../../catalog/data-access/catalog-mock.service';
import {RequestCatalogs} from '../../../catalog/domain/catalog.models';
import {RUNTIME_CONFIG} from '../../../../core/runtime-config';

const catalogs: RequestCatalogs = {
  courseTypes: [{id: 'course-digital', code: 'DIG', name: 'Digital'}],
  segments: [{id: 'segment-cn', code: 'CN', name: 'Comercial'}],
  locations: [{id: 'location-bog', code: 'BOG', name: 'Bogotá'}, {id: 'location-mad', code: 'MAD', name: 'Madrid'}],
  vendors: [{id: 'vendor-microsoft', code: 'MS', name: 'Microsoft'}],
  technologies: [{id: 'technology-azure', code: 'AZURE', name: 'Azure'}],
  certifications: [{id: 'cert-azure', code: 'AZF', name: 'Azure Fundamentals'}],
  exams: [{id: 'exam-az-900', code: 'AZ-900', name: 'Microsoft Azure Fundamentals', vendorId: 'vendor-microsoft', vendorName: 'Microsoft', technologyId: 'technology-azure', technologyName: 'Azure', certificationId: 'cert-azure', certificationName: 'Azure Fundamentals', courseName: 'Azure Fundamentals', retake: 'No incluido', comments: null, basePrice: '59.0000', currency: 'USD', active: true}]
};

describe('RequestFormPageComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RequestFormPageComponent],
    providers: [
      provideHttpClient(), provideHttpClientTesting(), provideNoopAnimations(),
      {provide: RUNTIME_CONFIG, useValue: {
        entraTenantId: 'tenant', entraFrontendClientId: 'frontend', entraBackendScope: 'scope',
        entraAuthority: 'https://login.microsoftonline.com/tenant',
        entraRedirectUri: 'http://localhost:4200', apiBasePath: '/api', environmentName: 'test'
      }},
      {provide: CatalogMockService, useValue: {loadCatalogs: () => of(structuredClone(catalogs)), getExam: () => of(catalogs.exams[0])}}
    ]
  }));

  function create(): {component: RequestFormPageComponent; http: HttpTestingController; element: HTMLElement} {
    const fixture = TestBed.createComponent(RequestFormPageComponent);
    fixture.detectChanges();
    const http = TestBed.inject(HttpTestingController);
    http.expectOne('/api/auth/me').flush({
      subject: 'subject', objectId: 'oid', name: 'Ana Ventas', username: 'ana@netec.com',
      tenantId: 'tenant', scopes: ['ExamRequests.Access'], roles: ['EXAM_SALES'],
      area: 'Ventas', businessUnit: 'Enterprise'
    });
    fixture.detectChanges();
    return {component: fixture.componentInstance, http, element: fixture.nativeElement as HTMLElement};
  }

  it('renderiza solicitante fijo y cuatro pasos con un solo paso activo', () => {
    const {element} = create();
    const text = element.textContent ?? '';
    ['Datos del solicitante', 'Información comercial', 'Participantes', 'Exámenes', 'Resumen', 'Guardar borrador', 'Continuar']
      .forEach(label => expect(text).toContain(label));
    expect(element.querySelectorAll('.form-stepper button:disabled').length).toBe(3);
    expect(element.querySelectorAll('.section-card').length).toBe(2);
  });

  it('muestra al solicitante como información no editable', () => {
    const {element} = create();
    expect(element.textContent).toContain('Ana Ventas');
    expect(element.textContent).toContain('Datos obtenidos de tu sesión; no pueden editarse.');
    expect(Array.from(element.querySelectorAll('input')).some(input => input.value === 'Ana Ventas')).toBeFalse();
    expect(element.textContent).toContain('ana@netec.com');
    expect(Array.from(element.querySelectorAll('input')).some(input => input.value === 'ana@netec.com')).toBeFalse();
  });

  it('muestra al solicitante como Asesor Comercial sin selector ni edición', () => {
    const {element, component} = create();
    expect(element.textContent).toContain('Asesor Comercial');
    expect(element.textContent).toContain('Se obtiene automáticamente de la sesión.');
    expect(element.querySelector('[formcontrolname="salesAdvisorId"]')).toBeNull();
    expect(component.form.controls.commercial.get('salesAdvisorId')).toBeNull();
    expect(element.querySelector('#sales-advisor-label')?.parentElement?.textContent).toContain('Ana Ventas');
  });

  it('muestra No disponible cuando la API no entrega UPN', () => {
    const fixture = TestBed.createComponent(RequestFormPageComponent);
    fixture.detectChanges();
    const http = TestBed.inject(HttpTestingController);
    http.expectOne('/api/auth/me').flush({
      subject: 'subject', name: 'Ana Ventas', username: '',
      tenantId: 'tenant', scopes: ['ExamRequests.Access'], roles: ['EXAM_SALES']
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No disponible');
  });

  it('carga catálogos simulados de forma separada', () => {
    const {component} = create();
    expect(component.loadingCatalogs()).toBeFalse();
    expect(component.catalogs()?.locations.some(x => x.code === 'MAD')).toBeTrue();
    expect(component.catalogs()?.exams.length).toBe(1);
  });

  it('selecciona examen, autocompleta costo y calcula con valor decimal escalado', () => {
    const {component} = create();
    const item = component.items.at(0);
    item.controls.examId.setValue('exam-az-900');
    component.selectExam(item);
    component.addParticipant();
    item.controls.participantIds.setValue(component.participants.controls.map(p => p.controls.clientId.value));
    expect(item.controls.saleUnitPrice.value).toBe('59.0000');
    expect(component.examFor(item)?.code).toBe('AZ-900');
    expect(component.lineTotal(item)).toBe(118);
    expect(component.totalAmount()).toBe(118);
  });

  it('agrega participantes y exige confirmación al eliminar uno con datos', () => {
    const {component} = create();
    component.addParticipant();
    expect(component.participants.length).toBe(2);
    component.participants.at(1).controls.firstName.setValue('Carlos');
    component.requestParticipantRemoval(1);
    expect(component.pendingParticipantRemoval()).toBe(1);
    component.removeParticipant(1);
    expect(component.participants.length).toBe(1);
  });

  it('detecta correos inválidos y duplicados normalizados', () => {
    const {component} = create();
    const first = component.participants.at(0);
    first.controls.email.setValue('correo-invalido');
    expect(first.controls.email.hasError('email')).toBeTrue();
    first.controls.email.setValue(' Persona@NETEC.COM ');
    component.addParticipant();
    component.participants.at(1).controls.email.setValue('persona@netec.com');
    component.participants.updateValueAndValidity();
    expect(component.participants.hasError('duplicateEmails')).toBeTrue();
    expect(component.isDuplicateEmail(0)).toBeTrue();
  });

  it('calcula cantidad por línea desde participantes asignados', () => {
    const {component} = create();
    const item = component.items.at(0);
    item.controls.participantIds.setValue([component.participants.at(0).controls.clientId.value]);
    expect(item.controls.quantity.value).toBe(1);
    expect(item.hasError('participantsQuantity')).toBeFalse();
  });

  it('guarda el subconjunto soportado por backend sin requester ni importes', () => {
    const {component, http} = create();
    component.form.controls.commercial.patchValue({scheduledCourseCode: 'EVT-1', billingReference: 'OF-1', observations: 'Nota'});
    component.saveDraft();
    const request = http.expectOne('/api/v1/exam-requests');
    expect(request.request.body).toEqual({scheduledCourseCode: 'EVT-1', siteCode: null, courseType: null, segment: null, costCenter: null, companyName: null, billingReference: 'OF-1', observations: 'Nota', participants: [], examAssignments: []});
    expect(request.request.body.requester).toBeUndefined();
    expect(request.request.body.salesAdvisorId).toBeUndefined();
    expect(request.request.body.salesAdvisorName).toBeUndefined();
    expect(request.request.body.totalAmount).toBeUndefined();
    request.flush({id: 'draft-1', status: 'BORRADOR', requester: {id: 'oid', name: 'Ana', email: 'ana@netec.com'}, createdAt: '2026-01-01Z', updatedAt: '2026-01-01Z', version: 0});
    expect(component.draft()?.id).toBe('draft-1');
    expect(component.saving()).toBeFalse();
  });

  it('captura Empresa como texto, normaliza espacios y la muestra en resumen', () => {
    const {component, element} = create();
    const control = component.form.controls.commercial.controls.companyName;
    control.setValue('  Mi   Empresa, S.A.  ');
    component.normalizeCompany();
    expect(control.value).toBe('Mi Empresa, S.A.');
    expect(component.companyName()).toBe('Mi Empresa, S.A.');
    expect(element.querySelector('input[formcontrolname="companyName"]')).not.toBeNull();
    expect(element.querySelector('mat-select[formcontrolname="companyId"]')).toBeNull();
  });

  it('valida Empresa y permite guardarla vacía como borrador sin consultar catálogo', () => {
    const {component, http} = create();
    const control = component.form.controls.commercial.controls.companyName;
    control.setValue('X');
    expect(control.hasError('companyMinLength')).toBeTrue();
    control.setValue('N/A');
    expect(control.hasError('companyNotAvailable')).toBeTrue();
    control.setValue('');
    component.saveDraft();
    expect(http.expectOne('/api/v1/exam-requests').request.body.companyName).toBeNull();
  });

  it('bloquea la validación de Madrid sin tasa resuelta por backend', () => {
    const {component} = create();
    component.form.controls.commercial.controls.organizationalLocationId.setValue('location-mad');
    component.validateRequest();
    expect(component.error()).toContain('Madrid requiere precio convertido por el backend');
    expect(component.validating()).toBeFalse();
  });

  it('evita iniciar dos guardados simultáneos', () => {
    const {component, http} = create();
    component.saveDraft();
    component.saveDraft();
    const requests = http.match('/api/v1/exam-requests');
    expect(requests.length).toBe(1);
    requests[0].flush({id: 'draft-1', status: 'BORRADOR', requester: {id: 'oid', name: 'Ana', email: 'ana@netec.com'}, createdAt: '2026-01-01Z', updatedAt: '2026-01-01Z', version: 0});
  });
});
