import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IBildFrontendDo, NewBildFrontendDo } from '../bild-frontend-do.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBildFrontendDo for edit and NewBildFrontendDoFormGroupInput for create.
 */
type BildFrontendDoFormGroupInput = IBildFrontendDo | PartialWithRequiredKeyOf<NewBildFrontendDo>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IBildFrontendDo | NewBildFrontendDo> = Omit<T, 'erstellung'> & {
  erstellung?: string | null;
};

type BildFrontendDoFormRawValue = FormValueOf<IBildFrontendDo>;

type NewBildFrontendDoFormRawValue = FormValueOf<NewBildFrontendDo>;

type BildFrontendDoFormDefaults = Pick<NewBildFrontendDo, 'id' | 'erstellung'>;

type BildFrontendDoFormGroupContent = {
  id: FormControl<BildFrontendDoFormRawValue['id'] | NewBildFrontendDo['id']>;
  bildbeschreibung: FormControl<BildFrontendDoFormRawValue['bildbeschreibung']>;
  typ: FormControl<BildFrontendDoFormRawValue['typ']>;
  erstellung: FormControl<BildFrontendDoFormRawValue['erstellung']>;
  bild: FormControl<BildFrontendDoFormRawValue['bild']>;
  bildContentType: FormControl<BildFrontendDoFormRawValue['bildContentType']>;
  kegelclubtreffen: FormControl<BildFrontendDoFormRawValue['kegelclubtreffen']>;
};

export type BildFrontendDoFormGroup = FormGroup<BildFrontendDoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BildFrontendDoFormService {
  createBildFrontendDoFormGroup(bild: BildFrontendDoFormGroupInput = { id: null }): BildFrontendDoFormGroup {
    const bildRawValue = this.convertBildFrontendDoToBildFrontendDoRawValue({
      ...this.getFormDefaults(),
      ...bild,
    });
    return new FormGroup<BildFrontendDoFormGroupContent>({
      id: new FormControl(
        { value: bildRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      bildbeschreibung: new FormControl(bildRawValue.bildbeschreibung),
      typ: new FormControl(bildRawValue.typ),
      erstellung: new FormControl(bildRawValue.erstellung, {
        validators: [Validators.required],
      }),
      bild: new FormControl(bildRawValue.bild, {
        validators: [Validators.required],
      }),
      bildContentType: new FormControl(bildRawValue.bildContentType),
      kegelclubtreffen: new FormControl(bildRawValue.kegelclubtreffen),
    });
  }

  getBildFrontendDo(form: BildFrontendDoFormGroup): IBildFrontendDo | NewBildFrontendDo {
    return this.convertBildFrontendDoRawValueToBildFrontendDo(
      form.getRawValue() as BildFrontendDoFormRawValue | NewBildFrontendDoFormRawValue,
    );
  }

  resetForm(form: BildFrontendDoFormGroup, bild: BildFrontendDoFormGroupInput): void {
    const bildRawValue = this.convertBildFrontendDoToBildFrontendDoRawValue({ ...this.getFormDefaults(), ...bild });
    form.reset(
      {
        ...bildRawValue,
        id: { value: bildRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): BildFrontendDoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      erstellung: currentTime,
    };
  }

  private convertBildFrontendDoRawValueToBildFrontendDo(
    rawBildFrontendDo: BildFrontendDoFormRawValue | NewBildFrontendDoFormRawValue,
  ): IBildFrontendDo | NewBildFrontendDo {
    return {
      ...rawBildFrontendDo,
      erstellung: dayjs(rawBildFrontendDo.erstellung, DATE_TIME_FORMAT),
    };
  }

  private convertBildFrontendDoToBildFrontendDoRawValue(
    bild: IBildFrontendDo | (Partial<NewBildFrontendDo> & BildFrontendDoFormDefaults),
  ): BildFrontendDoFormRawValue | PartialWithRequiredKeyOf<NewBildFrontendDoFormRawValue> {
    return {
      ...bild,
      erstellung: bild.erstellung ? bild.erstellung.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
