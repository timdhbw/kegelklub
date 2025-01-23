import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../kegelclubtreffen-frontend-do.test-samples';

import { KegelclubtreffenFrontendDoFormService } from './kegelclubtreffen-frontend-do-form.service';

describe('KegelclubtreffenFrontendDo Form Service', () => {
  let service: KegelclubtreffenFrontendDoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KegelclubtreffenFrontendDoFormService);
  });

  describe('Service methods', () => {
    describe('createKegelclubtreffenFrontendDoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createKegelclubtreffenFrontendDoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            zeitpunkt: expect.any(Object),
            dauer: expect.any(Object),
            treffpunkt: expect.any(Object),
          }),
        );
      });

      it('passing IKegelclubtreffenFrontendDo should create a new form with FormGroup', () => {
        const formGroup = service.createKegelclubtreffenFrontendDoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            zeitpunkt: expect.any(Object),
            dauer: expect.any(Object),
            treffpunkt: expect.any(Object),
          }),
        );
      });
    });

    describe('getKegelclubtreffenFrontendDo', () => {
      it('should return NewKegelclubtreffenFrontendDo for default KegelclubtreffenFrontendDo initial value', () => {
        const formGroup = service.createKegelclubtreffenFrontendDoFormGroup(sampleWithNewData);

        const kegelclubtreffen = service.getKegelclubtreffenFrontendDo(formGroup) as any;

        expect(kegelclubtreffen).toMatchObject(sampleWithNewData);
      });

      it('should return NewKegelclubtreffenFrontendDo for empty KegelclubtreffenFrontendDo initial value', () => {
        const formGroup = service.createKegelclubtreffenFrontendDoFormGroup();

        const kegelclubtreffen = service.getKegelclubtreffenFrontendDo(formGroup) as any;

        expect(kegelclubtreffen).toMatchObject({});
      });

      it('should return IKegelclubtreffenFrontendDo', () => {
        const formGroup = service.createKegelclubtreffenFrontendDoFormGroup(sampleWithRequiredData);

        const kegelclubtreffen = service.getKegelclubtreffenFrontendDo(formGroup) as any;

        expect(kegelclubtreffen).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IKegelclubtreffenFrontendDo should not enable id FormControl', () => {
        const formGroup = service.createKegelclubtreffenFrontendDoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewKegelclubtreffenFrontendDo should disable id FormControl', () => {
        const formGroup = service.createKegelclubtreffenFrontendDoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
