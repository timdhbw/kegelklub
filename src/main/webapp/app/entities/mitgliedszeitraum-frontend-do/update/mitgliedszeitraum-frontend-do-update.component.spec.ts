import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IKeglerFrontendDo } from 'app/entities/kegler-frontend-do/kegler-frontend-do.model';
import { KeglerFrontendDoService } from 'app/entities/kegler-frontend-do/service/kegler-frontend-do.service';
import { MitgliedszeitraumFrontendDoService } from '../service/mitgliedszeitraum-frontend-do.service';
import { IMitgliedszeitraumFrontendDo } from '../mitgliedszeitraum-frontend-do.model';
import { MitgliedszeitraumFrontendDoFormService } from './mitgliedszeitraum-frontend-do-form.service';

import { MitgliedszeitraumFrontendDoUpdateComponent } from './mitgliedszeitraum-frontend-do-update.component';

describe('MitgliedszeitraumFrontendDo Management Update Component', () => {
  let comp: MitgliedszeitraumFrontendDoUpdateComponent;
  let fixture: ComponentFixture<MitgliedszeitraumFrontendDoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let mitgliedszeitraumFormService: MitgliedszeitraumFrontendDoFormService;
  let mitgliedszeitraumService: MitgliedszeitraumFrontendDoService;
  let keglerService: KeglerFrontendDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MitgliedszeitraumFrontendDoUpdateComponent],
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
      .overrideTemplate(MitgliedszeitraumFrontendDoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MitgliedszeitraumFrontendDoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    mitgliedszeitraumFormService = TestBed.inject(MitgliedszeitraumFrontendDoFormService);
    mitgliedszeitraumService = TestBed.inject(MitgliedszeitraumFrontendDoService);
    keglerService = TestBed.inject(KeglerFrontendDoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call KeglerFrontendDo query and add missing value', () => {
      const mitgliedszeitraum: IMitgliedszeitraumFrontendDo = { id: 25825 };
      const kegler: IKeglerFrontendDo = { id: 12905 };
      mitgliedszeitraum.kegler = kegler;

      const keglerCollection: IKeglerFrontendDo[] = [{ id: 12905 }];
      jest.spyOn(keglerService, 'query').mockReturnValue(of(new HttpResponse({ body: keglerCollection })));
      const additionalKeglerFrontendDos = [kegler];
      const expectedCollection: IKeglerFrontendDo[] = [...additionalKeglerFrontendDos, ...keglerCollection];
      jest.spyOn(keglerService, 'addKeglerFrontendDoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ mitgliedszeitraum });
      comp.ngOnInit();

      expect(keglerService.query).toHaveBeenCalled();
      expect(keglerService.addKeglerFrontendDoToCollectionIfMissing).toHaveBeenCalledWith(
        keglerCollection,
        ...additionalKeglerFrontendDos.map(expect.objectContaining),
      );
      expect(comp.keglersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const mitgliedszeitraum: IMitgliedszeitraumFrontendDo = { id: 25825 };
      const kegler: IKeglerFrontendDo = { id: 12905 };
      mitgliedszeitraum.kegler = kegler;

      activatedRoute.data = of({ mitgliedszeitraum });
      comp.ngOnInit();

      expect(comp.keglersSharedCollection).toContainEqual(kegler);
      expect(comp.mitgliedszeitraum).toEqual(mitgliedszeitraum);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMitgliedszeitraumFrontendDo>>();
      const mitgliedszeitraum = { id: 2991 };
      jest.spyOn(mitgliedszeitraumFormService, 'getMitgliedszeitraumFrontendDo').mockReturnValue(mitgliedszeitraum);
      jest.spyOn(mitgliedszeitraumService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mitgliedszeitraum });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: mitgliedszeitraum }));
      saveSubject.complete();

      // THEN
      expect(mitgliedszeitraumFormService.getMitgliedszeitraumFrontendDo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(mitgliedszeitraumService.update).toHaveBeenCalledWith(expect.objectContaining(mitgliedszeitraum));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMitgliedszeitraumFrontendDo>>();
      const mitgliedszeitraum = { id: 2991 };
      jest.spyOn(mitgliedszeitraumFormService, 'getMitgliedszeitraumFrontendDo').mockReturnValue({ id: null });
      jest.spyOn(mitgliedszeitraumService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mitgliedszeitraum: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: mitgliedszeitraum }));
      saveSubject.complete();

      // THEN
      expect(mitgliedszeitraumFormService.getMitgliedszeitraumFrontendDo).toHaveBeenCalled();
      expect(mitgliedszeitraumService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMitgliedszeitraumFrontendDo>>();
      const mitgliedszeitraum = { id: 2991 };
      jest.spyOn(mitgliedszeitraumService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ mitgliedszeitraum });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(mitgliedszeitraumService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareKeglerFrontendDo', () => {
      it('Should forward to keglerService', () => {
        const entity = { id: 12905 };
        const entity2 = { id: 17453 };
        jest.spyOn(keglerService, 'compareKeglerFrontendDo');
        comp.compareKeglerFrontendDo(entity, entity2);
        expect(keglerService.compareKeglerFrontendDo).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
