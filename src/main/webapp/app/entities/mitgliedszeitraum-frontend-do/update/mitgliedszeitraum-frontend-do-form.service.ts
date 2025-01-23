import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IMitgliedszeitraumFrontendDo, NewMitgliedszeitraumFrontendDo } from '../mitgliedszeitraum-frontend-do.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMitgliedszeitraumFrontendDo for edit and NewMitgliedszeitraumFrontendDoFormGroupInput for create.
 */
type MitgliedszeitraumFrontendDoFormGroupInput = IMitgliedszeitraumFrontendDo | PartialWithRequiredKeyOf<NewMitgliedszeitraumFrontendDo>;

type MitgliedszeitraumFrontendDoFormDefaults = Pick<NewMitgliedszeitraumFrontendDo, 'id'>;

type MitgliedszeitraumFrontendDoFormGroupContent = {
  id: FormControl<IMitgliedszeitraumFrontendDo['id'] | NewMitgliedszeitraumFrontendDo['id']>;
  startMitgliedschaft: FormControl<IMitgliedszeitraumFrontendDo['startMitgliedschaft']>;
  endeMitgliedschaft: FormControl<IMitgliedszeitraumFrontendDo['endeMitgliedschaft']>;
  kegler: FormControl<IMitgliedszeitraumFrontendDo['kegler']>;
};

export type MitgliedszeitraumFrontendDoFormGroup = FormGroup<MitgliedszeitraumFrontendDoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MitgliedszeitraumFrontendDoFormService {
  createMitgliedszeitraumFrontendDoFormGroup(
    mitgliedszeitraum: MitgliedszeitraumFrontendDoFormGroupInput = { id: null },
  ): MitgliedszeitraumFrontendDoFormGroup {
    const mitgliedszeitraumRawValue = {
      ...this.getFormDefaults(),
      ...mitgliedszeitraum,
    };
    return new FormGroup<MitgliedszeitraumFrontendDoFormGroupContent>({
      id: new FormControl(
        { value: mitgliedszeitraumRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      startMitgliedschaft: new FormControl(mitgliedszeitraumRawValue.startMitgliedschaft, {
        validators: [Validators.required],
      }),
      endeMitgliedschaft: new FormControl(mitgliedszeitraumRawValue.endeMitgliedschaft),
      kegler: new FormControl(mitgliedszeitraumRawValue.kegler),
    });
  }

  getMitgliedszeitraumFrontendDo(
    form: MitgliedszeitraumFrontendDoFormGroup,
  ): IMitgliedszeitraumFrontendDo | NewMitgliedszeitraumFrontendDo {
    return form.getRawValue() as IMitgliedszeitraumFrontendDo | NewMitgliedszeitraumFrontendDo;
  }

  resetForm(form: MitgliedszeitraumFrontendDoFormGroup, mitgliedszeitraum: MitgliedszeitraumFrontendDoFormGroupInput): void {
    const mitgliedszeitraumRawValue = { ...this.getFormDefaults(), ...mitgliedszeitraum };
    form.reset(
      {
        ...mitgliedszeitraumRawValue,
        id: { value: mitgliedszeitraumRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): MitgliedszeitraumFrontendDoFormDefaults {
    return {
      id: null,
    };
  }
}
