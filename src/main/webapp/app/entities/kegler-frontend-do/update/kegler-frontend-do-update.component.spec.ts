import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { KeglerFrontendDoService } from '../service/kegler-frontend-do.service';
import { IKeglerFrontendDo } from '../kegler-frontend-do.model';
import { KeglerFrontendDoFormService } from './kegler-frontend-do-form.service';

import { KeglerFrontendDoUpdateComponent } from './kegler-frontend-do-update.component';

describe('KeglerFrontendDo Management Update Component', () => {
  let comp: KeglerFrontendDoUpdateComponent;
  let fixture: ComponentFixture<KeglerFrontendDoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let keglerFormService: KeglerFrontendDoFormService;
  let keglerService: KeglerFrontendDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KeglerFrontendDoUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(KeglerFrontendDoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KeglerFrontendDoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    keglerFormService = TestBed.inject(KeglerFrontendDoFormService);
    keglerService = TestBed.inject(KeglerFrontendDoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const kegler: IKeglerFrontendDo = { id: 17453 };

      activatedRoute.data = of({ kegler });
      comp.ngOnInit();

      expect(comp.kegler).toEqual(kegler);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKeglerFrontendDo>>();
      const kegler = { id: 12905 };
      jest.spyOn(keglerFormService, 'getKeglerFrontendDo').mockReturnValue(kegler);
      jest.spyOn(keglerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ kegler });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: kegler }));
      saveSubject.complete();

      // THEN
      expect(keglerFormService.getKeglerFrontendDo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(keglerService.update).toHaveBeenCalledWith(expect.objectContaining(kegler));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKeglerFrontendDo>>();
      const kegler = { id: 12905 };
      jest.spyOn(keglerFormService, 'getKeglerFrontendDo').mockReturnValue({ id: null });
      jest.spyOn(keglerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ kegler: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: kegler }));
      saveSubject.complete();

      // THEN
      expect(keglerFormService.getKeglerFrontendDo).toHaveBeenCalled();
      expect(keglerService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKeglerFrontendDo>>();
      const kegler = { id: 12905 };
      jest.spyOn(keglerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ kegler });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(keglerService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
