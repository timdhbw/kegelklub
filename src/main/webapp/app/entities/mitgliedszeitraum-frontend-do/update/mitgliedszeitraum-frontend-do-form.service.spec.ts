import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../mitgliedszeitraum-frontend-do.test-samples';

import { MitgliedszeitraumFrontendDoFormService } from './mitgliedszeitraum-frontend-do-form.service';

describe('MitgliedszeitraumFrontendDo Form Service', () => {
  let service: MitgliedszeitraumFrontendDoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MitgliedszeitraumFrontendDoFormService);
  });

  describe('Service methods', () => {
    describe('createMitgliedszeitraumFrontendDoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMitgliedszeitraumFrontendDoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startMitgliedschaft: expect.any(Object),
            endeMitgliedschaft: expect.any(Object),
            kegler: expect.any(Object),
          }),
        );
      });

      it('passing IMitgliedszeitraumFrontendDo should create a new form with FormGroup', () => {
        const formGroup = service.createMitgliedszeitraumFrontendDoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startMitgliedschaft: expect.any(Object),
            endeMitgliedschaft: expect.any(Object),
            kegler: expect.any(Object),
          }),
        );
      });
    });

    describe('getMitgliedszeitraumFrontendDo', () => {
      it('should return NewMitgliedszeitraumFrontendDo for default MitgliedszeitraumFrontendDo initial value', () => {
        const formGroup = service.createMitgliedszeitraumFrontendDoFormGroup(sampleWithNewData);

        const mitgliedszeitraum = service.getMitgliedszeitraumFrontendDo(formGroup) as any;

        expect(mitgliedszeitraum).toMatchObject(sampleWithNewData);
      });

      it('should return NewMitgliedszeitraumFrontendDo for empty MitgliedszeitraumFrontendDo initial value', () => {
        const formGroup = service.createMitgliedszeitraumFrontendDoFormGroup();

        const mitgliedszeitraum = service.getMitgliedszeitraumFrontendDo(formGroup) as any;

        expect(mitgliedszeitraum).toMatchObject({});
      });

      it('should return IMitgliedszeitraumFrontendDo', () => {
        const formGroup = service.createMitgliedszeitraumFrontendDoFormGroup(sampleWithRequiredData);

        const mitgliedszeitraum = service.getMitgliedszeitraumFrontendDo(formGroup) as any;

        expect(mitgliedszeitraum).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMitgliedszeitraumFrontendDo should not enable id FormControl', () => {
        const formGroup = service.createMitgliedszeitraumFrontendDoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMitgliedszeitraumFrontendDo should disable id FormControl', () => {
        const formGroup = service.createMitgliedszeitraumFrontendDoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
