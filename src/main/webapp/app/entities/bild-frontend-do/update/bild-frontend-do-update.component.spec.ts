import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IKegelclubtreffenFrontendDo } from 'app/entities/kegelclubtreffen-frontend-do/kegelclubtreffen-frontend-do.model';
import { KegelclubtreffenFrontendDoService } from 'app/entities/kegelclubtreffen-frontend-do/service/kegelclubtreffen-frontend-do.service';
import { BildFrontendDoService } from '../service/bild-frontend-do.service';
import { IBildFrontendDo } from '../bild-frontend-do.model';
import { BildFrontendDoFormService } from './bild-frontend-do-form.service';

import { BildFrontendDoUpdateComponent } from './bild-frontend-do-update.component';

describe('BildFrontendDo Management Update Component', () => {
  let comp: BildFrontendDoUpdateComponent;
  let fixture: ComponentFixture<BildFrontendDoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let bildFormService: BildFrontendDoFormService;
  let bildService: BildFrontendDoService;
  let kegelclubtreffenService: KegelclubtreffenFrontendDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BildFrontendDoUpdateComponent],
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
      .overrideTemplate(BildFrontendDoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BildFrontendDoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bildFormService = TestBed.inject(BildFrontendDoFormService);
    bildService = TestBed.inject(BildFrontendDoService);
    kegelclubtreffenService = TestBed.inject(KegelclubtreffenFrontendDoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call KegelclubtreffenFrontendDo query and add missing value', () => {
      const bild: IBildFrontendDo = { id: 9596 };
      const kegelclubtreffen: IKegelclubtreffenFrontendDo = { id: 21216 };
      bild.kegelclubtreffen = kegelclubtreffen;

      const kegelclubtreffenCollection: IKegelclubtreffenFrontendDo[] = [{ id: 21216 }];
      jest.spyOn(kegelclubtreffenService, 'query').mockReturnValue(of(new HttpResponse({ body: kegelclubtreffenCollection })));
      const additionalKegelclubtreffenFrontendDos = [kegelclubtreffen];
      const expectedCollection: IKegelclubtreffenFrontendDo[] = [...additionalKegelclubtreffenFrontendDos, ...kegelclubtreffenCollection];
      jest.spyOn(kegelclubtreffenService, 'addKegelclubtreffenFrontendDoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ bild });
      comp.ngOnInit();

      expect(kegelclubtreffenService.query).toHaveBeenCalled();
      expect(kegelclubtreffenService.addKegelclubtreffenFrontendDoToCollectionIfMissing).toHaveBeenCalledWith(
        kegelclubtreffenCollection,
        ...additionalKegelclubtreffenFrontendDos.map(expect.objectContaining),
      );
      expect(comp.kegelclubtreffensSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const bild: IBildFrontendDo = { id: 9596 };
      const kegelclubtreffen: IKegelclubtreffenFrontendDo = { id: 21216 };
      bild.kegelclubtreffen = kegelclubtreffen;

      activatedRoute.data = of({ bild });
      comp.ngOnInit();

      expect(comp.kegelclubtreffensSharedCollection).toContainEqual(kegelclubtreffen);
      expect(comp.bild).toEqual(bild);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBildFrontendDo>>();
      const bild = { id: 10466 };
      jest.spyOn(bildFormService, 'getBildFrontendDo').mockReturnValue(bild);
      jest.spyOn(bildService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bild });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bild }));
      saveSubject.complete();

      // THEN
      expect(bildFormService.getBildFrontendDo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bildService.update).toHaveBeenCalledWith(expect.objectContaining(bild));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBildFrontendDo>>();
      const bild = { id: 10466 };
      jest.spyOn(bildFormService, 'getBildFrontendDo').mockReturnValue({ id: null });
      jest.spyOn(bildService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bild: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bild }));
      saveSubject.complete();

      // THEN
      expect(bildFormService.getBildFrontendDo).toHaveBeenCalled();
      expect(bildService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBildFrontendDo>>();
      const bild = { id: 10466 };
      jest.spyOn(bildService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bild });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bildService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareKegelclubtreffenFrontendDo', () => {
      it('Should forward to kegelclubtreffenService', () => {
        const entity = { id: 21216 };
        const entity2 = { id: 9577 };
        jest.spyOn(kegelclubtreffenService, 'compareKegelclubtreffenFrontendDo');
        comp.compareKegelclubtreffenFrontendDo(entity, entity2);
        expect(kegelclubtreffenService.compareKegelclubtreffenFrontendDo).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
