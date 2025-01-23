import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../kegler-frontend-do.test-samples';

import { KeglerFrontendDoFormService } from './kegler-frontend-do-form.service';

describe('KeglerFrontendDo Form Service', () => {
  let service: KeglerFrontendDoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeglerFrontendDoFormService);
  });

  describe('Service methods', () => {
    describe('createKeglerFrontendDoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createKeglerFrontendDoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
          }),
        );
      });

      it('passing IKeglerFrontendDo should create a new form with FormGroup', () => {
        const formGroup = service.createKeglerFrontendDoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
          }),
        );
      });
    });

    describe('getKeglerFrontendDo', () => {
      it('should return NewKeglerFrontendDo for default KeglerFrontendDo initial value', () => {
        const formGroup = service.createKeglerFrontendDoFormGroup(sampleWithNewData);

        const kegler = service.getKeglerFrontendDo(formGroup) as any;

        expect(kegler).toMatchObject(sampleWithNewData);
      });

      it('should return NewKeglerFrontendDo for empty KeglerFrontendDo initial value', () => {
        const formGroup = service.createKeglerFrontendDoFormGroup();

        const kegler = service.getKeglerFrontendDo(formGroup) as any;

        expect(kegler).toMatchObject({});
      });

      it('should return IKeglerFrontendDo', () => {
        const formGroup = service.createKeglerFrontendDoFormGroup(sampleWithRequiredData);

        const kegler = service.getKeglerFrontendDo(formGroup) as any;

        expect(kegler).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IKeglerFrontendDo should not enable id FormControl', () => {
        const formGroup = service.createKeglerFrontendDoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewKeglerFrontendDo should disable id FormControl', () => {
        const formGroup = service.createKeglerFrontendDoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
