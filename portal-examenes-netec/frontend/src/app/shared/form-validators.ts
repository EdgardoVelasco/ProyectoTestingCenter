import {AbstractControl, FormArray, ValidationErrors, ValidatorFn} from '@angular/forms';

export const trimRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  return typeof value === 'string' && value.trim().length === 0 ? {trimRequired: true} : null;
};

export const normalizeCompanyName = (value: string): string =>
  value.trim().replace(/\s+/g, ' ');

export const companyNameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = normalizeCompanyName(String(control.value ?? ''));
  if (!value) return null;
  if (value.length < 2) return {companyMinLength: true};
  if (value.length > 150) return {companyMaxLength: true};
  return /^N\/A$/i.test(value) ? {companyNotAvailable: true} : null;
};

export const positiveIntegerValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = Number(control.value);
  return Number.isInteger(value) && value > 0 ? null : {positiveInteger: true};
};

export const duplicateEmailsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!(control instanceof FormArray)) return null;
  const normalized = control.controls
    .map(row => String(row.get('email')?.value ?? '').trim().toLowerCase())
    .filter(Boolean);
  const duplicates = normalized.filter((email, index) => normalized.indexOf(email) !== index);
  return duplicates.length ? {duplicateEmails: [...new Set(duplicates)]} : null;
};

export const participantsQuantityValidator = (participants: FormArray): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const quantity = Number(control.get('quantity')?.value ?? 0);
    const assignments = (control.get('participantIds')?.value as string[] | null)?.length ?? 0;
    if (!quantity || !assignments) return null;
    return quantity === assignments ? null : {participantsQuantity: true};
  };
