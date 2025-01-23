import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IKegelclubtreffenFrontendDo } from '../kegelclubtreffen-frontend-do.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../kegelclubtreffen-frontend-do.test-samples';

import { KegelclubtreffenFrontendDoService, RestKegelclubtreffenFrontendDo } from './kegelclubtreffen-frontend-do.service';

const requireRestSample: RestKegelclubtreffenFrontendDo = {
  ...sampleWithRequiredData,
  zeitpunkt: sampleWithRequiredData.zeitpunkt?.toJSON(),
};

describe('KegelclubtreffenFrontendDo Service', () => {
  let service: KegelclubtreffenFrontendDoService;
  let httpMock: HttpTestingController;
  let expectedResult: IKegelclubtreffenFrontendDo | IKegelclubtreffenFrontendDo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(KegelclubtreffenFrontendDoService);
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

    it('should create a KegelclubtreffenFrontendDo', () => {
      const kegelclubtreffen = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(kegelclubtreffen).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a KegelclubtreffenFrontendDo', () => {
      const kegelclubtreffen = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(kegelclubtreffen).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a KegelclubtreffenFrontendDo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of KegelclubtreffenFrontendDo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a KegelclubtreffenFrontendDo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addKegelclubtreffenFrontendDoToCollectionIfMissing', () => {
      it('should add a KegelclubtreffenFrontendDo to an empty array', () => {
        const kegelclubtreffen: IKegelclubtreffenFrontendDo = sampleWithRequiredData;
        expectedResult = service.addKegelclubtreffenFrontendDoToCollectionIfMissing([], kegelclubtreffen);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(kegelclubtreffen);
      });

      it('should not add a KegelclubtreffenFrontendDo to an array that contains it', () => {
        const kegelclubtreffen: IKegelclubtreffenFrontendDo = sampleWithRequiredData;
        const kegelclubtreffenCollection: IKegelclubtreffenFrontendDo[] = [
          {
            ...kegelclubtreffen,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addKegelclubtreffenFrontendDoToCollectionIfMissing(kegelclubtreffenCollection, kegelclubtreffen);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a KegelclubtreffenFrontendDo to an array that doesn't contain it", () => {
        const kegelclubtreffen: IKegelclubtreffenFrontendDo = sampleWithRequiredData;
        const kegelclubtreffenCollection: IKegelclubtreffenFrontendDo[] = [sampleWithPartialData];
        expectedResult = service.addKegelclubtreffenFrontendDoToCollectionIfMissing(kegelclubtreffenCollection, kegelclubtreffen);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(kegelclubtreffen);
      });

      it('should add only unique KegelclubtreffenFrontendDo to an array', () => {
        const kegelclubtreffenArray: IKegelclubtreffenFrontendDo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const kegelclubtreffenCollection: IKegelclubtreffenFrontendDo[] = [sampleWithRequiredData];
        expectedResult = service.addKegelclubtreffenFrontendDoToCollectionIfMissing(kegelclubtreffenCollection, ...kegelclubtreffenArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const kegelclubtreffen: IKegelclubtreffenFrontendDo = sampleWithRequiredData;
        const kegelclubtreffen2: IKegelclubtreffenFrontendDo = sampleWithPartialData;
        expectedResult = service.addKegelclubtreffenFrontendDoToCollectionIfMissing([], kegelclubtreffen, kegelclubtreffen2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(kegelclubtreffen);
        expect(expectedResult).toContain(kegelclubtreffen2);
      });

      it('should accept null and undefined values', () => {
        const kegelclubtreffen: IKegelclubtreffenFrontendDo = sampleWithRequiredData;
        expectedResult = service.addKegelclubtreffenFrontendDoToCollectionIfMissing([], null, kegelclubtreffen, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(kegelclubtreffen);
      });

      it('should return initial array if no KegelclubtreffenFrontendDo is added', () => {
        const kegelclubtreffenCollection: IKegelclubtreffenFrontendDo[] = [sampleWithRequiredData];
        expectedResult = service.addKegelclubtreffenFrontendDoToCollectionIfMissing(kegelclubtreffenCollection, undefined, null);
        expect(expectedResult).toEqual(kegelclubtreffenCollection);
      });
    });

    describe('compareKegelclubtreffenFrontendDo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareKegelclubtreffenFrontendDo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 21216 };
        const entity2 = null;

        const compareResult1 = service.compareKegelclubtreffenFrontendDo(entity1, entity2);
        const compareResult2 = service.compareKegelclubtreffenFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 21216 };
        const entity2 = { id: 9577 };

        const compareResult1 = service.compareKegelclubtreffenFrontendDo(entity1, entity2);
        const compareResult2 = service.compareKegelclubtreffenFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 21216 };
        const entity2 = { id: 21216 };

        const compareResult1 = service.compareKegelclubtreffenFrontendDo(entity1, entity2);
        const compareResult2 = service.compareKegelclubtreffenFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
