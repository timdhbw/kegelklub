import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IKegelclubtreffenFrontendDo, NewKegelclubtreffenFrontendDo } from '../kegelclubtreffen-frontend-do.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IKegelclubtreffenFrontendDo for edit and NewKegelclubtreffenFrontendDoFormGroupInput for create.
 */
type KegelclubtreffenFrontendDoFormGroupInput = IKegelclubtreffenFrontendDo | PartialWithRequiredKeyOf<NewKegelclubtreffenFrontendDo>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IKegelclubtreffenFrontendDo | NewKegelclubtreffenFrontendDo> = Omit<T, 'zeitpunkt'> & {
  zeitpunkt?: string | null;
};

type KegelclubtreffenFrontendDoFormRawValue = FormValueOf<IKegelclubtreffenFrontendDo>;

type NewKegelclubtreffenFrontendDoFormRawValue = FormValueOf<NewKegelclubtreffenFrontendDo>;

type KegelclubtreffenFrontendDoFormDefaults = Pick<NewKegelclubtreffenFrontendDo, 'id' | 'zeitpunkt'>;

type KegelclubtreffenFrontendDoFormGroupContent = {
  id: FormControl<KegelclubtreffenFrontendDoFormRawValue['id'] | NewKegelclubtreffenFrontendDo['id']>;
  zeitpunkt: FormControl<KegelclubtreffenFrontendDoFormRawValue['zeitpunkt']>;
  dauer: FormControl<KegelclubtreffenFrontendDoFormRawValue['dauer']>;
  treffpunkt: FormControl<KegelclubtreffenFrontendDoFormRawValue['treffpunkt']>;
};

export type KegelclubtreffenFrontendDoFormGroup = FormGroup<KegelclubtreffenFrontendDoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class KegelclubtreffenFrontendDoFormService {
  createKegelclubtreffenFrontendDoFormGroup(
    kegelclubtreffen: KegelclubtreffenFrontendDoFormGroupInput = { id: null },
  ): KegelclubtreffenFrontendDoFormGroup {
    const kegelclubtreffenRawValue = this.convertKegelclubtreffenFrontendDoToKegelclubtreffenFrontendDoRawValue({
      ...this.getFormDefaults(),
      ...kegelclubtreffen,
    });
    return new FormGroup<KegelclubtreffenFrontendDoFormGroupContent>({
      id: new FormControl(
        { value: kegelclubtreffenRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      zeitpunkt: new FormControl(kegelclubtreffenRawValue.zeitpunkt, {
        validators: [Validators.required],
      }),
      dauer: new FormControl(kegelclubtreffenRawValue.dauer),
      treffpunkt: new FormControl(kegelclubtreffenRawValue.treffpunkt, {
        validators: [Validators.required],
      }),
    });
  }

  getKegelclubtreffenFrontendDo(form: KegelclubtreffenFrontendDoFormGroup): IKegelclubtreffenFrontendDo | NewKegelclubtreffenFrontendDo {
    return this.convertKegelclubtreffenFrontendDoRawValueToKegelclubtreffenFrontendDo(
      form.getRawValue() as KegelclubtreffenFrontendDoFormRawValue | NewKegelclubtreffenFrontendDoFormRawValue,
    );
  }

  resetForm(form: KegelclubtreffenFrontendDoFormGroup, kegelclubtreffen: KegelclubtreffenFrontendDoFormGroupInput): void {
    const kegelclubtreffenRawValue = this.convertKegelclubtreffenFrontendDoToKegelclubtreffenFrontendDoRawValue({
      ...this.getFormDefaults(),
      ...kegelclubtreffen,
    });
    form.reset(
      {
        ...kegelclubtreffenRawValue,
        id: { value: kegelclubtreffenRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): KegelclubtreffenFrontendDoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      zeitpunkt: currentTime,
    };
  }

  private convertKegelclubtreffenFrontendDoRawValueToKegelclubtreffenFrontendDo(
    rawKegelclubtreffenFrontendDo: KegelclubtreffenFrontendDoFormRawValue | NewKegelclubtreffenFrontendDoFormRawValue,
  ): IKegelclubtreffenFrontendDo | NewKegelclubtreffenFrontendDo {
    return {
      ...rawKegelclubtreffenFrontendDo,
      zeitpunkt: dayjs(rawKegelclubtreffenFrontendDo.zeitpunkt, DATE_TIME_FORMAT),
    };
  }

  private convertKegelclubtreffenFrontendDoToKegelclubtreffenFrontendDoRawValue(
    kegelclubtreffen: IKegelclubtreffenFrontendDo | (Partial<NewKegelclubtreffenFrontendDo> & KegelclubtreffenFrontendDoFormDefaults),
  ): KegelclubtreffenFrontendDoFormRawValue | PartialWithRequiredKeyOf<NewKegelclubtreffenFrontendDoFormRawValue> {
    return {
      ...kegelclubtreffen,
      zeitpunkt: kegelclubtreffen.zeitpunkt ? kegelclubtreffen.zeitpunkt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
