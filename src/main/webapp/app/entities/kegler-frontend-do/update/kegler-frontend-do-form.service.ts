import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IKeglerFrontendDo, NewKeglerFrontendDo } from '../kegler-frontend-do.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IKeglerFrontendDo for edit and NewKeglerFrontendDoFormGroupInput for create.
 */
type KeglerFrontendDoFormGroupInput = IKeglerFrontendDo | PartialWithRequiredKeyOf<NewKeglerFrontendDo>;

type KeglerFrontendDoFormDefaults = Pick<NewKeglerFrontendDo, 'id'>;

type KeglerFrontendDoFormGroupContent = {
  id: FormControl<IKeglerFrontendDo['id'] | NewKeglerFrontendDo['id']>;
  name: FormControl<IKeglerFrontendDo['name']>;
};

export type KeglerFrontendDoFormGroup = FormGroup<KeglerFrontendDoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class KeglerFrontendDoFormService {
  createKeglerFrontendDoFormGroup(kegler: KeglerFrontendDoFormGroupInput = { id: null }): KeglerFrontendDoFormGroup {
    const keglerRawValue = {
      ...this.getFormDefaults(),
      ...kegler,
    };
    return new FormGroup<KeglerFrontendDoFormGroupContent>({
      id: new FormControl(
        { value: keglerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(keglerRawValue.name, {
        validators: [Validators.required],
      }),
    });
  }

  getKeglerFrontendDo(form: KeglerFrontendDoFormGroup): IKeglerFrontendDo | NewKeglerFrontendDo {
    return form.getRawValue() as IKeglerFrontendDo | NewKeglerFrontendDo;
  }

  resetForm(form: KeglerFrontendDoFormGroup, kegler: KeglerFrontendDoFormGroupInput): void {
    const keglerRawValue = { ...this.getFormDefaults(), ...kegler };
    form.reset(
      {
        ...keglerRawValue,
        id: { value: keglerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): KeglerFrontendDoFormDefaults {
    return {
      id: null,
    };
  }
}
