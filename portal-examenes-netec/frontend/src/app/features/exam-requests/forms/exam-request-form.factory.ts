import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {duplicateEmailsValidator, participantsQuantityValidator, positiveIntegerValidator, trimRequiredValidator, companyNameValidator} from '../../../shared/form-validators';

export type ParticipantForm = FormGroup<{
  clientId: FormControl<string>; firstName: FormControl<string>; lastName: FormControl<string>;
  secondLastName: FormControl<string>; email: FormControl<string>;
}>;

export type ItemForm = FormGroup<{
  examId: FormControl<string>; saleUnitPrice: FormControl<string>; quantity: FormControl<number>;
  participantIds: FormControl<string[]>;
}>;

export interface RequestFormValue {
  commercial: {scheduledCourseCode: string | null; courseTypeId: string | null; segmentId: string | null;
    organizationalLocationId: string | null; companyName: string | null; billingReference: string | null; observations: string | null;};
  examFilters: {vendorId: string | null; technologyId: string | null; certificationId: string | null; query: string | null};
  participants: Array<{clientId: string; firstName: string; lastName: string; secondLastName: string; email: string}>;
  items: Array<{examId: string; saleUnitPrice: string; quantity: number; participantIds: string[]}>;
}

export function createExamRequestForm(fb: FormBuilder) {
  return fb.group({
    commercial: fb.group({
      scheduledCourseCode: ['', [Validators.maxLength(80)]], courseTypeId: [''], segmentId: ['', [Validators.required]],
      organizationalLocationId: ['', [Validators.required]], companyName: ['', [Validators.required, trimRequiredValidator, companyNameValidator, Validators.maxLength(150)]],
      billingReference: ['', [Validators.maxLength(250)]], observations: ['', [Validators.maxLength(2000)]]
    }),
    examFilters: fb.group({vendorId: [''], technologyId: [''], certificationId: [''], query: ['']}),
    participants: fb.array<ParticipantForm>([], [Validators.minLength(1), duplicateEmailsValidator]),
    items: fb.array<ItemForm>([], [Validators.minLength(1)])
  });
}

export function createParticipantForm(fb: FormBuilder): ParticipantForm {
  return fb.group({
    clientId: fb.nonNullable.control<string>(crypto.randomUUID()),
    firstName: fb.nonNullable.control('', [Validators.required, trimRequiredValidator, Validators.maxLength(100)]),
    lastName: fb.nonNullable.control('', [Validators.required, trimRequiredValidator, Validators.maxLength(100)]),
    secondLastName: fb.nonNullable.control('', [Validators.maxLength(100)]),
    email: fb.nonNullable.control('', [Validators.required, trimRequiredValidator, Validators.email, Validators.maxLength(254)])
  });
}

export function createExamItemForm(fb: FormBuilder, participants: FormArray<ParticipantForm>): ItemForm {
  const item = fb.group({
    examId: fb.nonNullable.control('', [Validators.required]),
    saleUnitPrice: fb.nonNullable.control('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,4})?$/)]),
    quantity: fb.nonNullable.control(1, [Validators.required, positiveIntegerValidator]),
    participantIds: fb.nonNullable.control<string[]>([], [Validators.required])
  });
  item.addValidators(participantsQuantityValidator(participants));
  return item;
}
