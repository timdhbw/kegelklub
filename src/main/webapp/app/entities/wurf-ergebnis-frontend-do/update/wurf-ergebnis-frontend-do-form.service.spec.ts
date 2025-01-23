import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../wurf-ergebnis-frontend-do.test-samples';

import { WurfErgebnisFrontendDoFormService } from './wurf-ergebnis-frontend-do-form.service';

describe('WurfErgebnisFrontendDo Form Service', () => {
  let service: WurfErgebnisFrontendDoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WurfErgebnisFrontendDoFormService);
  });

  describe('Service methods', () => {
    describe('createWurfErgebnisFrontendDoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWurfErgebnisFrontendDoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            anzahlWuerfe: expect.any(Object),
            gesamtpunktzahl: expect.any(Object),
            pudel: expect.any(Object),
            neuner: expect.any(Object),
            kraenze: expect.any(Object),
            kegler: expect.any(Object),
            kegelclubtreffen: expect.any(Object),
          }),
        );
      });

      it('passing IWurfErgebnisFrontendDo should create a new form with FormGroup', () => {
        const formGroup = service.createWurfErgebnisFrontendDoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            anzahlWuerfe: expect.any(Object),
            gesamtpunktzahl: expect.any(Object),
            pudel: expect.any(Object),
            neuner: expect.any(Object),
            kraenze: expect.any(Object),
            kegler: expect.any(Object),
            kegelclubtreffen: expect.any(Object),
          }),
        );
      });
    });

    describe('getWurfErgebnisFrontendDo', () => {
      it('should return NewWurfErgebnisFrontendDo for default WurfErgebnisFrontendDo initial value', () => {
        const formGroup = service.createWurfErgebnisFrontendDoFormGroup(sampleWithNewData);

        const wurfErgebnis = service.getWurfErgebnisFrontendDo(formGroup) as any;

        expect(wurfErgebnis).toMatchObject(sampleWithNewData);
      });

      it('should return NewWurfErgebnisFrontendDo for empty WurfErgebnisFrontendDo initial value', () => {
        const formGroup = service.createWurfErgebnisFrontendDoFormGroup();

        const wurfErgebnis = service.getWurfErgebnisFrontendDo(formGroup) as any;

        expect(wurfErgebnis).toMatchObject({});
      });

      it('should return IWurfErgebnisFrontendDo', () => {
        const formGroup = service.createWurfErgebnisFrontendDoFormGroup(sampleWithRequiredData);

        const wurfErgebnis = service.getWurfErgebnisFrontendDo(formGroup) as any;

        expect(wurfErgebnis).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWurfErgebnisFrontendDo should not enable id FormControl', () => {
        const formGroup = service.createWurfErgebnisFrontendDoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWurfErgebnisFrontendDo should disable id FormControl', () => {
        const formGroup = service.createWurfErgebnisFrontendDoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
