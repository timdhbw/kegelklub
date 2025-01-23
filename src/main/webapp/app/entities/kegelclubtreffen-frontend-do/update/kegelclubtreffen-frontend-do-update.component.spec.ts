import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { KegelclubtreffenFrontendDoService } from '../service/kegelclubtreffen-frontend-do.service';
import { IKegelclubtreffenFrontendDo } from '../kegelclubtreffen-frontend-do.model';
import { KegelclubtreffenFrontendDoFormService } from './kegelclubtreffen-frontend-do-form.service';

import { KegelclubtreffenFrontendDoUpdateComponent } from './kegelclubtreffen-frontend-do-update.component';

describe('KegelclubtreffenFrontendDo Management Update Component', () => {
  let comp: KegelclubtreffenFrontendDoUpdateComponent;
  let fixture: ComponentFixture<KegelclubtreffenFrontendDoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let kegelclubtreffenFormService: KegelclubtreffenFrontendDoFormService;
  let kegelclubtreffenService: KegelclubtreffenFrontendDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KegelclubtreffenFrontendDoUpdateComponent],
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
      .overrideTemplate(KegelclubtreffenFrontendDoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KegelclubtreffenFrontendDoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    kegelclubtreffenFormService = TestBed.inject(KegelclubtreffenFrontendDoFormService);
    kegelclubtreffenService = TestBed.inject(KegelclubtreffenFrontendDoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const kegelclubtreffen: IKegelclubtreffenFrontendDo = { id: 9577 };

      activatedRoute.data = of({ kegelclubtreffen });
      comp.ngOnInit();

      expect(comp.kegelclubtreffen).toEqual(kegelclubtreffen);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKegelclubtreffenFrontendDo>>();
      const kegelclubtreffen = { id: 21216 };
      jest.spyOn(kegelclubtreffenFormService, 'getKegelclubtreffenFrontendDo').mockReturnValue(kegelclubtreffen);
      jest.spyOn(kegelclubtreffenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ kegelclubtreffen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: kegelclubtreffen }));
      saveSubject.complete();

      // THEN
      expect(kegelclubtreffenFormService.getKegelclubtreffenFrontendDo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(kegelclubtreffenService.update).toHaveBeenCalledWith(expect.objectContaining(kegelclubtreffen));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKegelclubtreffenFrontendDo>>();
      const kegelclubtreffen = { id: 21216 };
      jest.spyOn(kegelclubtreffenFormService, 'getKegelclubtreffenFrontendDo').mockReturnValue({ id: null });
      jest.spyOn(kegelclubtreffenService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ kegelclubtreffen: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: kegelclubtreffen }));
      saveSubject.complete();

      // THEN
      expect(kegelclubtreffenFormService.getKegelclubtreffenFrontendDo).toHaveBeenCalled();
      expect(kegelclubtreffenService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKegelclubtreffenFrontendDo>>();
      const kegelclubtreffen = { id: 21216 };
      jest.spyOn(kegelclubtreffenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ kegelclubtreffen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(kegelclubtreffenService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
