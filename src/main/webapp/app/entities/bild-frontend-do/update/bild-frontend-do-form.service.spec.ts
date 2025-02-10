import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../bild-frontend-do.test-samples';

import { BildFrontendDoFormService } from './bild-frontend-do-form.service';

describe('BildFrontendDo Form Service', () => {
  let service: BildFrontendDoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BildFrontendDoFormService);
  });

  describe('Service methods', () => {
    describe('createBildFrontendDoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBildFrontendDoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bildbeschreibung: expect.any(Object),
            typ: expect.any(Object),
            erstellung: expect.any(Object),
            bild: expect.any(Object),
            kegelclubtreffen: expect.any(Object),
          }),
        );
      });

      it('passing IBildFrontendDo should create a new form with FormGroup', () => {
        const formGroup = service.createBildFrontendDoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            bildbeschreibung: expect.any(Object),
            typ: expect.any(Object),
            erstellung: expect.any(Object),
            bild: expect.any(Object),
            kegelclubtreffen: expect.any(Object),
          }),
        );
      });
    });

    describe('getBildFrontendDo', () => {
      it('should return NewBildFrontendDo for default BildFrontendDo initial value', () => {
        const formGroup = service.createBildFrontendDoFormGroup(sampleWithNewData);

        const bild = service.getBildFrontendDo(formGroup) as any;

        expect(bild).toMatchObject(sampleWithNewData);
      });

      it('should return NewBildFrontendDo for empty BildFrontendDo initial value', () => {
        const formGroup = service.createBildFrontendDoFormGroup();

        const bild = service.getBildFrontendDo(formGroup) as any;

        expect(bild).toMatchObject({});
      });

      it('should return IBildFrontendDo', () => {
        const formGroup = service.createBildFrontendDoFormGroup(sampleWithRequiredData);

        const bild = service.getBildFrontendDo(formGroup) as any;

        expect(bild).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBildFrontendDo should not enable id FormControl', () => {
        const formGroup = service.createBildFrontendDoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBildFrontendDo should disable id FormControl', () => {
        const formGroup = service.createBildFrontendDoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
