import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IKeglerFrontendDo } from 'app/entities/kegler-frontend-do/kegler-frontend-do.model';
import { KeglerFrontendDoService } from 'app/entities/kegler-frontend-do/service/kegler-frontend-do.service';
import { IKegelclubtreffenFrontendDo } from 'app/entities/kegelclubtreffen-frontend-do/kegelclubtreffen-frontend-do.model';
import { KegelclubtreffenFrontendDoService } from 'app/entities/kegelclubtreffen-frontend-do/service/kegelclubtreffen-frontend-do.service';
import { IWurfErgebnisFrontendDo } from '../wurf-ergebnis-frontend-do.model';
import { WurfErgebnisFrontendDoService } from '../service/wurf-ergebnis-frontend-do.service';
import { WurfErgebnisFrontendDoFormService } from './wurf-ergebnis-frontend-do-form.service';

import { WurfErgebnisFrontendDoUpdateComponent } from './wurf-ergebnis-frontend-do-update.component';

describe('WurfErgebnisFrontendDo Management Update Component', () => {
  let comp: WurfErgebnisFrontendDoUpdateComponent;
  let fixture: ComponentFixture<WurfErgebnisFrontendDoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let wurfErgebnisFormService: WurfErgebnisFrontendDoFormService;
  let wurfErgebnisService: WurfErgebnisFrontendDoService;
  let keglerService: KeglerFrontendDoService;
  let kegelclubtreffenService: KegelclubtreffenFrontendDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WurfErgebnisFrontendDoUpdateComponent],
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
      .overrideTemplate(WurfErgebnisFrontendDoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WurfErgebnisFrontendDoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    wurfErgebnisFormService = TestBed.inject(WurfErgebnisFrontendDoFormService);
    wurfErgebnisService = TestBed.inject(WurfErgebnisFrontendDoService);
    keglerService = TestBed.inject(KeglerFrontendDoService);
    kegelclubtreffenService = TestBed.inject(KegelclubtreffenFrontendDoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call KeglerFrontendDo query and add missing value', () => {
      const wurfErgebnis: IWurfErgebnisFrontendDo = { id: 8320 };
      const kegler: IKeglerFrontendDo = { id: 12905 };
      wurfErgebnis.kegler = kegler;

      const keglerCollection: IKeglerFrontendDo[] = [{ id: 12905 }];
      jest.spyOn(keglerService, 'query').mockReturnValue(of(new HttpResponse({ body: keglerCollection })));
      const additionalKeglerFrontendDos = [kegler];
      const expectedCollection: IKeglerFrontendDo[] = [...additionalKeglerFrontendDos, ...keglerCollection];
      jest.spyOn(keglerService, 'addKeglerFrontendDoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ wurfErgebnis });
      comp.ngOnInit();

      expect(keglerService.query).toHaveBeenCalled();
      expect(keglerService.addKeglerFrontendDoToCollectionIfMissing).toHaveBeenCalledWith(
        keglerCollection,
        ...additionalKeglerFrontendDos.map(expect.objectContaining),
      );
      expect(comp.keglersSharedCollection).toEqual(expectedCollection);
    });

    it('Should call KegelclubtreffenFrontendDo query and add missing value', () => {
      const wurfErgebnis: IWurfErgebnisFrontendDo = { id: 8320 };
      const kegelclubtreffen: IKegelclubtreffenFrontendDo = { id: 21216 };
      wurfErgebnis.kegelclubtreffen = kegelclubtreffen;

      const kegelclubtreffenCollection: IKegelclubtreffenFrontendDo[] = [{ id: 21216 }];
      jest.spyOn(kegelclubtreffenService, 'query').mockReturnValue(of(new HttpResponse({ body: kegelclubtreffenCollection })));
      const additionalKegelclubtreffenFrontendDos = [kegelclubtreffen];
      const expectedCollection: IKegelclubtreffenFrontendDo[] = [...additionalKegelclubtreffenFrontendDos, ...kegelclubtreffenCollection];
      jest.spyOn(kegelclubtreffenService, 'addKegelclubtreffenFrontendDoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ wurfErgebnis });
      comp.ngOnInit();

      expect(kegelclubtreffenService.query).toHaveBeenCalled();
      expect(kegelclubtreffenService.addKegelclubtreffenFrontendDoToCollectionIfMissing).toHaveBeenCalledWith(
        kegelclubtreffenCollection,
        ...additionalKegelclubtreffenFrontendDos.map(expect.objectContaining),
      );
      expect(comp.kegelclubtreffensSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const wurfErgebnis: IWurfErgebnisFrontendDo = { id: 8320 };
      const kegler: IKeglerFrontendDo = { id: 12905 };
      wurfErgebnis.kegler = kegler;
      const kegelclubtreffen: IKegelclubtreffenFrontendDo = { id: 21216 };
      wurfErgebnis.kegelclubtreffen = kegelclubtreffen;

      activatedRoute.data = of({ wurfErgebnis });
      comp.ngOnInit();

      expect(comp.keglersSharedCollection).toContainEqual(kegler);
      expect(comp.kegelclubtreffensSharedCollection).toContainEqual(kegelclubtreffen);
      expect(comp.wurfErgebnis).toEqual(wurfErgebnis);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWurfErgebnisFrontendDo>>();
      const wurfErgebnis = { id: 2964 };
      jest.spyOn(wurfErgebnisFormService, 'getWurfErgebnisFrontendDo').mockReturnValue(wurfErgebnis);
      jest.spyOn(wurfErgebnisService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ wurfErgebnis });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: wurfErgebnis }));
      saveSubject.complete();

      // THEN
      expect(wurfErgebnisFormService.getWurfErgebnisFrontendDo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(wurfErgebnisService.update).toHaveBeenCalledWith(expect.objectContaining(wurfErgebnis));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWurfErgebnisFrontendDo>>();
      const wurfErgebnis = { id: 2964 };
      jest.spyOn(wurfErgebnisFormService, 'getWurfErgebnisFrontendDo').mockReturnValue({ id: null });
      jest.spyOn(wurfErgebnisService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ wurfErgebnis: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: wurfErgebnis }));
      saveSubject.complete();

      // THEN
      expect(wurfErgebnisFormService.getWurfErgebnisFrontendDo).toHaveBeenCalled();
      expect(wurfErgebnisService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWurfErgebnisFrontendDo>>();
      const wurfErgebnis = { id: 2964 };
      jest.spyOn(wurfErgebnisService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ wurfErgebnis });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(wurfErgebnisService.update).toHaveBeenCalled();
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
