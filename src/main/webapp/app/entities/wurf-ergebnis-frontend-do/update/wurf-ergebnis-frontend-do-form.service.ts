import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IWurfErgebnisFrontendDo, NewWurfErgebnisFrontendDo } from '../wurf-ergebnis-frontend-do.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWurfErgebnisFrontendDo for edit and NewWurfErgebnisFrontendDoFormGroupInput for create.
 */
type WurfErgebnisFrontendDoFormGroupInput = IWurfErgebnisFrontendDo | PartialWithRequiredKeyOf<NewWurfErgebnisFrontendDo>;

type WurfErgebnisFrontendDoFormDefaults = Pick<NewWurfErgebnisFrontendDo, 'id'>;

type WurfErgebnisFrontendDoFormGroupContent = {
  id: FormControl<IWurfErgebnisFrontendDo['id'] | NewWurfErgebnisFrontendDo['id']>;
  anzahlWuerfe: FormControl<IWurfErgebnisFrontendDo['anzahlWuerfe']>;
  gesamtpunktzahl: FormControl<IWurfErgebnisFrontendDo['gesamtpunktzahl']>;
  pudel: FormControl<IWurfErgebnisFrontendDo['pudel']>;
  neuner: FormControl<IWurfErgebnisFrontendDo['neuner']>;
  kraenze: FormControl<IWurfErgebnisFrontendDo['kraenze']>;
  kegler: FormControl<IWurfErgebnisFrontendDo['kegler']>;
  kegelclubtreffen: FormControl<IWurfErgebnisFrontendDo['kegelclubtreffen']>;
};

export type WurfErgebnisFrontendDoFormGroup = FormGroup<WurfErgebnisFrontendDoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WurfErgebnisFrontendDoFormService {
  createWurfErgebnisFrontendDoFormGroup(
    wurfErgebnis: WurfErgebnisFrontendDoFormGroupInput = { id: null },
  ): WurfErgebnisFrontendDoFormGroup {
    const wurfErgebnisRawValue = {
      ...this.getFormDefaults(),
      ...wurfErgebnis,
    };
    return new FormGroup<WurfErgebnisFrontendDoFormGroupContent>({
      id: new FormControl(
        { value: wurfErgebnisRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      anzahlWuerfe: new FormControl(wurfErgebnisRawValue.anzahlWuerfe, {
        validators: [Validators.required],
      }),
      gesamtpunktzahl: new FormControl(wurfErgebnisRawValue.gesamtpunktzahl, {
        validators: [Validators.required],
      }),
      pudel: new FormControl(wurfErgebnisRawValue.pudel, {
        validators: [Validators.required],
      }),
      neuner: new FormControl(wurfErgebnisRawValue.neuner, {
        validators: [Validators.required],
      }),
      kraenze: new FormControl(wurfErgebnisRawValue.kraenze, {
        validators: [Validators.required],
      }),
      kegler: new FormControl(wurfErgebnisRawValue.kegler, {
        validators: [Validators.required],
      }),
      kegelclubtreffen: new FormControl(wurfErgebnisRawValue.kegelclubtreffen, {
        validators: [Validators.required],
      }),
    });
  }

  getWurfErgebnisFrontendDo(form: WurfErgebnisFrontendDoFormGroup): IWurfErgebnisFrontendDo | NewWurfErgebnisFrontendDo {
    return form.getRawValue() as IWurfErgebnisFrontendDo | NewWurfErgebnisFrontendDo;
  }

  resetForm(form: WurfErgebnisFrontendDoFormGroup, wurfErgebnis: WurfErgebnisFrontendDoFormGroupInput): void {
    const wurfErgebnisRawValue = { ...this.getFormDefaults(), ...wurfErgebnis };
    form.reset(
      {
        ...wurfErgebnisRawValue,
        id: { value: wurfErgebnisRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): WurfErgebnisFrontendDoFormDefaults {
    return {
      id: null,
    };
  }
}
