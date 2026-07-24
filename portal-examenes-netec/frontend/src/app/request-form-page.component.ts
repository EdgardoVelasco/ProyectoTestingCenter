import {CurrencyPipe} from '@angular/common';
import {Component, OnDestroy, OnInit, computed, inject, signal} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {Subject, finalize, takeUntil} from 'rxjs';
import {CatalogMockService} from './core/catalog-mock.service';
import {ExamCatalogItem, RequestCatalogs} from './core/catalog.models';
import {Draft, ExamRequestApi, Requester} from './core/exam-request.api';
import {ExamRequestMockService} from './core/exam-request-mock.service';
import {ConfirmationData, ConfirmationDialogComponent} from './confirmation-dialog.component';
import {RequestRecoveryService} from './core/request-recovery.service';
import {companyNameValidator, duplicateEmailsValidator, normalizeCompanyName, participantsQuantityValidator, positiveIntegerValidator, trimRequiredValidator} from './shared/form-validators';

type ParticipantForm = FormGroup<{
  clientId: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  secondLastName: FormControl<string>;
  email: FormControl<string>;
}>;

type ItemForm = FormGroup<{
  examId: FormControl<string>;
  saleUnitPrice: FormControl<string>;
  quantity: FormControl<number>;
  participantIds: FormControl<string[]>;
}>;

interface RequestFormValue {
  commercial: {
    scheduledCourseCode: string | null; courseTypeId: string | null;
    segmentId: string | null; organizationalLocationId: string | null; companyName: string | null;
    billingReference: string | null; observations: string | null;
  };
  examFilters: {vendorId: string | null; technologyId: string | null; certificationId: string | null; query: string | null};
  participants: Array<{clientId: string; firstName: string; lastName: string; secondLastName: string; email: string}>;
  items: Array<{examId: string; saleUnitPrice: string; quantity: number; participantIds: string[]}>;
}

@Component({
  selector: 'app-request-form-page',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, MatButtonModule, MatCardModule, MatDialogModule,
    MatDividerModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
    MatSelectModule, MatSnackBarModule],
  templateUrl: './request-form-page.component.html'
})
export class RequestFormPageComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ExamRequestApi);
  private readonly catalogsApi = inject(CatalogMockService);
  private readonly workflow = inject(ExamRequestMockService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly recovery = inject(RequestRecoveryService);
  private readonly destroyed$ = new Subject<void>();
  private participantSequence = 1;

  readonly requester = signal<Requester | null>(null);
  readonly catalogs = signal<RequestCatalogs | null>(null);
  readonly draft = signal<Draft | null>(null);
  readonly loadingCatalogs = signal(true);
  readonly saving = signal(false);
  readonly validating = signal(false);
  readonly submitting = signal(false);
  readonly error = signal<string | null>(null);
  readonly validationAttempted = signal(false);
  readonly pendingParticipantRemoval = signal<number | null>(null);
  readonly cancelConfirmation = signal(false);
  readonly uiRevision = signal(0);
  readonly currentStep = signal(0);
  readonly maxVisitedStep = signal(0);
  readonly steps = ['Información comercial', 'Participantes', 'Exámenes', 'Resumen'];

  readonly form = this.fb.group({
    commercial: this.fb.group({
      scheduledCourseCode: ['', [Validators.maxLength(80)]],
      courseTypeId: [''],
      segmentId: ['', [Validators.required]],
      organizationalLocationId: ['', [Validators.required]],
      companyName: ['', [Validators.required, trimRequiredValidator, companyNameValidator, Validators.maxLength(150)]],
      billingReference: ['', [Validators.maxLength(250)]],
      observations: ['', [Validators.maxLength(2000)]]
    }),
    examFilters: this.fb.group({vendorId: [''], technologyId: [''], certificationId: [''], query: ['']}),
    participants: this.fb.array<ParticipantForm>([], [Validators.minLength(1), duplicateEmailsValidator]),
    items: this.fb.array<ItemForm>([], [Validators.minLength(1)])
  });

  readonly selectedLocation = computed(() => {
    this.uiRevision();
    return this.catalogs()?.locations.find(x => x.id === this.form.controls.commercial.controls.organizationalLocationId.value);
  });

  readonly filteredExams = computed(() => {
    this.uiRevision();
    const filters = this.form.controls.examFilters.getRawValue();
    const query = (filters.query ?? '').trim().toLowerCase();
    return (this.catalogs()?.exams ?? []).filter(exam =>
      (!filters.vendorId || exam.vendorId === filters.vendorId) &&
      (!filters.technologyId || exam.technologyId === filters.technologyId) &&
      (!filters.certificationId || exam.certificationId === filters.certificationId) &&
      (!query || [exam.code,exam.name,exam.courseName,exam.vendorName].some(value => value.toLowerCase().includes(query))));
  });
  readonly filteredVendors = computed(() =>
    [...new Set(this.filteredExams().map(exam => exam.vendorName))].sort());

  readonly totalAmount = computed(() => {
    this.uiRevision();
    return this.items.controls.reduce((total, item) => total + this.lineTotal(item), 0);
  });

  get participants(): FormArray<ParticipantForm> { return this.form.controls.participants; }
  get items(): FormArray<ItemForm> { return this.form.controls.items; }

  ngOnInit(): void {
    this.api.me().pipe(takeUntil(this.destroyed$)).subscribe({
      next: requester => this.requester.set(requester),
      error: () => this.error.set('No fue posible identificar tu sesión.')
    });
    this.catalogsApi.loadCatalogs().pipe(finalize(() => this.loadingCatalogs.set(false)), takeUntil(this.destroyed$)).subscribe({
      next: catalogs => this.catalogs.set(catalogs),
      error: () => this.error.set('No fue posible cargar los catálogos. Intenta nuevamente.')
    });
    this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => this.uiRevision.update(value => value + 1));
    this.addParticipant();
    this.addExamItem();
    this.recovery.register(() => ({
      form: this.form.getRawValue(),
      currentStep: this.currentStep(),
      maxVisitedStep: this.maxVisitedStep()
    }));
    const recovered = this.recovery.consume<{
      form: RequestFormValue;
      currentStep: number;
      maxVisitedStep: number;
    }>();
    if (recovered) {
      this.restoreTemporaryData(recovered.form);
      this.currentStep.set(Math.min(3, recovered.currentStep));
      this.maxVisitedStep.set(Math.min(3, recovered.maxVisitedStep));
      this.snackBar.open('Recuperamos los datos temporales de tu sesión.', 'Cerrar', {duration: 4000});
    }
  }

  ngOnDestroy(): void {
    this.recovery.unregister();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  addParticipant(): void {
    if (this.participants.length >= 100) return;
    this.participants.push(this.fb.group({
      clientId: this.fb.nonNullable.control<string>(crypto.randomUUID()),
      firstName: this.fb.nonNullable.control('', [Validators.required, trimRequiredValidator, Validators.maxLength(100)]),
      lastName: this.fb.nonNullable.control('', [Validators.required, trimRequiredValidator, Validators.maxLength(100)]),
      secondLastName: this.fb.nonNullable.control('', [Validators.maxLength(100)]),
      email: this.fb.nonNullable.control('', [Validators.required, trimRequiredValidator, Validators.email, Validators.maxLength(254)])
    }));
    this.participants.updateValueAndValidity();
  }

  requestParticipantRemoval(index: number): void {
    const value = this.participants.at(index).getRawValue();
    const hasData = [value.firstName, value.lastName, value.secondLastName, value.email].some(item => item.trim());
    if (hasData) this.pendingParticipantRemoval.set(index);
    else this.removeParticipant(index);
  }

  removeParticipant(index: number): void {
    const id = this.participants.at(index).controls.clientId.value;
    this.participants.removeAt(index);
    this.items.controls.forEach(item => item.controls.participantIds.setValue(item.controls.participantIds.value.filter(x => x !== id)));
    this.pendingParticipantRemoval.set(null);
    this.participants.updateValueAndValidity();
  }

  addExamItem(): void {
    if (this.items.length >= 100) return;
    const item = this.fb.group({
      examId: this.fb.nonNullable.control('', [Validators.required]),
      saleUnitPrice: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,4})?$/)]),
      quantity: this.fb.nonNullable.control(1, [Validators.required, positiveIntegerValidator]),
      participantIds: this.fb.nonNullable.control<string[]>([], [Validators.required])
    });
    item.addValidators(participantsQuantityValidator(this.participants));
    item.controls.participantIds.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(ids => {
      item.controls.quantity.setValue(ids.length, {emitEvent: false});
      item.updateValueAndValidity({emitEvent: false});
    });
    this.items.push(item);
  }

  removeExamItem(index: number): void {
    if (this.items.length > 1) this.items.removeAt(index);
  }

  selectExam(item: ItemForm): void {
    const exam = this.examFor(item);
    item.controls.saleUnitPrice.setValue(exam?.basePrice ?? '');
    item.controls.saleUnitPrice.markAsDirty();
  }

  examFor(item: ItemForm): ExamCatalogItem | undefined {
    return this.catalogs()?.exams.find(exam => exam.id === item.controls.examId.value);
  }
  examsForVendor(vendor: string): ExamCatalogItem[] {
    return this.filteredExams().filter(exam => exam.vendorName === vendor);
  }

  isDuplicateEmail(index: number): boolean {
    const email = this.participants.at(index).controls.email.value.trim().toLowerCase();
    return !!email && this.participants.controls.some((row, rowIndex) => rowIndex !== index && row.controls.email.value.trim().toLowerCase() === email);
  }

  lineTotal(item: ItemForm): number {
    const price = this.examFor(item)?.basePrice ?? '0';
    const match = /^(\d+)(?:\.(\d{1,4}))?$/.exec(price);
    if (!match) return 0;
    const scaled = Number(match[1]) * 10000 + Number((match[2] ?? '').padEnd(4, '0'));
    return (scaled * item.controls.participantIds.value.length) / 10000;
  }

  companyName(): string {
    return normalizeCompanyName(this.form.controls.commercial.controls.companyName.value ?? '');
  }

  normalizeCompany(): void {
    const control = this.form.controls.commercial.controls.companyName;
    const normalized = normalizeCompanyName(control.value ?? '');
    if (normalized !== control.value) control.setValue(normalized);
  }

  segmentName(): string {
    const id = this.form.controls.commercial.controls.segmentId.value;
    return this.catalogs()?.segments.find(x => x.id === id)?.name ?? '';
  }

  saveDraft(): void {
    if (this.saving()) return;
    this.error.set(null);
    this.saving.set(true);
    const commercial = this.form.controls.commercial.getRawValue();
    const body = {
      scheduledCourseCode: commercial.scheduledCourseCode || null,
      siteCode: this.catalogs()?.locations.find(x => x.id === commercial.organizationalLocationId)?.code ?? null,
      companyName: this.companyName() || null,
      billingReference: commercial.billingReference || null,
      observations: commercial.observations || null,
      participants: this.participants.controls.filter(person => {
        const value = person.getRawValue();
        return [value.firstName,value.lastName,value.secondLastName,value.email].some(field => field.trim());
      }).map(person => {
        const value = person.getRawValue();
        return {id: value.clientId, firstName: value.firstName, lastName: value.lastName,
          secondLastName: value.secondLastName || null, email: value.email};
      }),
      examAssignments: this.items.controls.filter(item => !!item.controls.examId.value)
        .map(item => ({examCatalogId: item.controls.examId.value, participantIds: item.controls.participantIds.value}))
    };
    const current = this.draft();
    const request = current ? this.api.update(current.id, current.version, body) : this.api.create(body);
    request.pipe(finalize(() => this.saving.set(false)), takeUntil(this.destroyed$)).subscribe({
      next: draft => {
        this.draft.set(draft);
        this.recovery.clear();
        sessionStorage.setItem(`netec.draft-step.${draft.id}`, String(this.currentStep()));
        this.form.markAsPristine();
        this.snackBar.open('Borrador guardado correctamente.', 'Cerrar', {duration: 3500});
      },
      error: response => this.error.set(response?.error?.detail ?? 'No fue posible guardar. Tus datos permanecen en pantalla.')
    });
  }

  validateRequest(): void {
    if (this.validating()) return;
    this.validationAttempted.set(true);
    this.form.markAllAsTouched();
    this.participants.updateValueAndValidity();
    this.items.controls.forEach(item => item.updateValueAndValidity());
    if (this.form.invalid || this.requiresMadridRate()) {
      this.error.set(this.requiresMadridRate() ? 'Madrid requiere precio convertido por el backend antes de continuar.' : 'Revisa los campos marcados antes de continuar.');
      queueMicrotask(() => document.querySelector<HTMLElement>('.error-summary')?.focus());
      return;
    }
    this.validating.set(true);
    this.workflow.validate().pipe(finalize(() => this.validating.set(false)), takeUntil(this.destroyed$)).subscribe(() => {
      this.error.set(null);
      this.snackBar.open('Validación frontend completada (simulación de desarrollo).', 'Cerrar', {duration: 4000});
    });
  }

  send(): void {
    if (this.submitting()) return;
    this.validateRequest();
    if (this.form.invalid || this.requiresMadridRate()) return;
    const data = this.confirmationData();
    this.dialog.open(ConfirmationDialogComponent, {data, width: '680px', maxWidth: '95vw', autoFocus: 'first-tabbable'}).afterClosed()
      .pipe(takeUntil(this.destroyed$)).subscribe(confirmed => {
        if (!confirmed || this.submitting()) return;
        this.submitting.set(true);
        const current = this.draft();
        if (!current) { this.submitting.set(false); this.error.set('Guarda el borrador antes de enviarlo a aprobación.'); return; }
        this.api.submit(current.id).pipe(finalize(() => this.submitting.set(false)), takeUntil(this.destroyed$)).subscribe({
          next: result => this.snackBar.open(`Solicitud registrada. Estado: ${result.status}.`, 'Cerrar', {duration: 5000}),
          error: response => this.error.set(response?.error?.detail ?? 'No fue posible registrar la solicitud para aprobación.')
        });
      });
  }

  requestCancel(): void {
    if (this.form.dirty) this.cancelConfirmation.set(true);
    else this.resetForm();
  }

  resetForm(): void {
    this.form.controls.commercial.reset({scheduledCourseCode: '', courseTypeId: '', segmentId: '', organizationalLocationId: '', companyName: '', billingReference: '', observations: ''});
    this.form.controls.examFilters.reset({vendorId: '', technologyId: '', certificationId: '', query: ''});
    this.participants.clear();
    this.items.clear();
    this.addParticipant();
    this.addExamItem();
    this.draft.set(null);
    this.error.set(null);
    this.validationAttempted.set(false);
    this.cancelConfirmation.set(false);
    this.currentStep.set(0);
    this.maxVisitedStep.set(0);
    this.form.markAsPristine();
  }

  private restoreTemporaryData(value: RequestFormValue): void {
    this.form.controls.commercial.patchValue(value.commercial);
    this.form.controls.examFilters.patchValue(value.examFilters);
    this.participants.clear();
    value.participants.forEach(participant => {
      this.addParticipant();
      this.participants.at(this.participants.length - 1).patchValue(participant);
    });
    this.items.clear();
    value.items.forEach(item => {
      this.addExamItem();
      this.items.at(this.items.length - 1).patchValue(item);
    });
    if (!this.participants.length) this.addParticipant();
    if (!this.items.length) this.addExamItem();
    this.form.markAsDirty();
  }

  goToStep(index: number): void {
    if (index < 0 || index > this.maxVisitedStep() || index >= this.steps.length) return;
    this.currentStep.set(index);
  }

  previousStep(): void {
    this.currentStep.update(step => Math.max(0, step - 1));
  }

  nextStep(): void {
    const step = this.currentStep();
    if (!this.validateStep(step)) return;
    const next = Math.min(this.steps.length - 1, step + 1);
    this.maxVisitedStep.update(visited => Math.max(visited, next));
    this.currentStep.set(next);
  }

  stepState(index: number): 'current' | 'completed' | 'error' | 'blocked' | 'pending' {
    if (index === this.currentStep()) return 'current';
    if (index > this.maxVisitedStep()) return 'blocked';
    if (this.validationAttempted() && !this.isStepValid(index)) return 'error';
    if (index < this.currentStep() || index < this.maxVisitedStep()) return 'completed';
    return 'pending';
  }

  private requiresMadridRate(): boolean {
    return this.selectedLocation()?.code === 'MAD';
  }

  private validateStep(step: number): boolean {
    this.validationAttempted.set(true);
    const valid = this.isStepValid(step);
    if (!valid) {
      this.error.set('Revisa los campos marcados en este paso antes de continuar.');
      const control = step === 0 ? this.form.controls.commercial :
        step === 1 ? this.form.controls.participants : this.form.controls.items;
      control.markAllAsTouched();
      queueMicrotask(() => document.querySelector<HTMLElement>('.error-summary')?.focus());
    } else {
      this.error.set(null);
    }
    return valid;
  }

  private isStepValid(step: number): boolean {
    if (step === 0) return this.form.controls.commercial.valid;
    if (step === 1) {
      this.participants.updateValueAndValidity();
      return this.participants.valid;
    }
    if (step === 2) {
      this.items.controls.forEach(item => item.updateValueAndValidity());
      return this.items.length > 0 && this.items.controls.every(item =>
        item.controls.examId.valid && item.controls.participantIds.valid);
    }
    return this.form.valid && !this.requiresMadridRate();
  }

  private confirmationData(): ConfirmationData {
    const currency = this.selectedLocation()?.code === 'MAD' ? 'EUR' : 'USD';
    return {
      requester: this.requester()?.name ?? 'No disponible',
      company: this.companyName(),
      exams: this.items.controls.map(item => ({name: this.examFor(item)?.name ?? '', quantity: item.controls.quantity.value, subtotal: this.lineTotal(item), currency})),
      participants: this.participants.length,
      total: this.totalAmount(),
      currency,
      billingReference: this.form.controls.commercial.controls.billingReference.value ?? ''
    };
  }
}
