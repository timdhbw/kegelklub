import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IWurfErgebnisFrontendDo } from '../wurf-ergebnis-frontend-do.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../wurf-ergebnis-frontend-do.test-samples';

import { WurfErgebnisFrontendDoService } from './wurf-ergebnis-frontend-do.service';

const requireRestSample: IWurfErgebnisFrontendDo = {
  ...sampleWithRequiredData,
};

describe('WurfErgebnisFrontendDo Service', () => {
  let service: WurfErgebnisFrontendDoService;
  let httpMock: HttpTestingController;
  let expectedResult: IWurfErgebnisFrontendDo | IWurfErgebnisFrontendDo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(WurfErgebnisFrontendDoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a WurfErgebnisFrontendDo', () => {
      const wurfErgebnis = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(wurfErgebnis).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WurfErgebnisFrontendDo', () => {
      const wurfErgebnis = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(wurfErgebnis).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WurfErgebnisFrontendDo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WurfErgebnisFrontendDo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WurfErgebnisFrontendDo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWurfErgebnisFrontendDoToCollectionIfMissing', () => {
      it('should add a WurfErgebnisFrontendDo to an empty array', () => {
        const wurfErgebnis: IWurfErgebnisFrontendDo = sampleWithRequiredData;
        expectedResult = service.addWurfErgebnisFrontendDoToCollectionIfMissing([], wurfErgebnis);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(wurfErgebnis);
      });

      it('should not add a WurfErgebnisFrontendDo to an array that contains it', () => {
        const wurfErgebnis: IWurfErgebnisFrontendDo = sampleWithRequiredData;
        const wurfErgebnisCollection: IWurfErgebnisFrontendDo[] = [
          {
            ...wurfErgebnis,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWurfErgebnisFrontendDoToCollectionIfMissing(wurfErgebnisCollection, wurfErgebnis);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WurfErgebnisFrontendDo to an array that doesn't contain it", () => {
        const wurfErgebnis: IWurfErgebnisFrontendDo = sampleWithRequiredData;
        const wurfErgebnisCollection: IWurfErgebnisFrontendDo[] = [sampleWithPartialData];
        expectedResult = service.addWurfErgebnisFrontendDoToCollectionIfMissing(wurfErgebnisCollection, wurfErgebnis);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(wurfErgebnis);
      });

      it('should add only unique WurfErgebnisFrontendDo to an array', () => {
        const wurfErgebnisArray: IWurfErgebnisFrontendDo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const wurfErgebnisCollection: IWurfErgebnisFrontendDo[] = [sampleWithRequiredData];
        expectedResult = service.addWurfErgebnisFrontendDoToCollectionIfMissing(wurfErgebnisCollection, ...wurfErgebnisArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const wurfErgebnis: IWurfErgebnisFrontendDo = sampleWithRequiredData;
        const wurfErgebnis2: IWurfErgebnisFrontendDo = sampleWithPartialData;
        expectedResult = service.addWurfErgebnisFrontendDoToCollectionIfMissing([], wurfErgebnis, wurfErgebnis2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(wurfErgebnis);
        expect(expectedResult).toContain(wurfErgebnis2);
      });

      it('should accept null and undefined values', () => {
        const wurfErgebnis: IWurfErgebnisFrontendDo = sampleWithRequiredData;
        expectedResult = service.addWurfErgebnisFrontendDoToCollectionIfMissing([], null, wurfErgebnis, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(wurfErgebnis);
      });

      it('should return initial array if no WurfErgebnisFrontendDo is added', () => {
        const wurfErgebnisCollection: IWurfErgebnisFrontendDo[] = [sampleWithRequiredData];
        expectedResult = service.addWurfErgebnisFrontendDoToCollectionIfMissing(wurfErgebnisCollection, undefined, null);
        expect(expectedResult).toEqual(wurfErgebnisCollection);
      });
    });

    describe('compareWurfErgebnisFrontendDo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWurfErgebnisFrontendDo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 2964 };
        const entity2 = null;

        const compareResult1 = service.compareWurfErgebnisFrontendDo(entity1, entity2);
        const compareResult2 = service.compareWurfErgebnisFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 2964 };
        const entity2 = { id: 8320 };

        const compareResult1 = service.compareWurfErgebnisFrontendDo(entity1, entity2);
        const compareResult2 = service.compareWurfErgebnisFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 2964 };
        const entity2 = { id: 2964 };

        const compareResult1 = service.compareWurfErgebnisFrontendDo(entity1, entity2);
        const compareResult2 = service.compareWurfErgebnisFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
