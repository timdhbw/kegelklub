import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IMitgliedszeitraumFrontendDo } from '../mitgliedszeitraum-frontend-do.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../mitgliedszeitraum-frontend-do.test-samples';

import { MitgliedszeitraumFrontendDoService, RestMitgliedszeitraumFrontendDo } from './mitgliedszeitraum-frontend-do.service';

const requireRestSample: RestMitgliedszeitraumFrontendDo = {
  ...sampleWithRequiredData,
  startMitgliedschaft: sampleWithRequiredData.startMitgliedschaft?.format(DATE_FORMAT),
  endeMitgliedschaft: sampleWithRequiredData.endeMitgliedschaft?.format(DATE_FORMAT),
};

describe('MitgliedszeitraumFrontendDo Service', () => {
  let service: MitgliedszeitraumFrontendDoService;
  let httpMock: HttpTestingController;
  let expectedResult: IMitgliedszeitraumFrontendDo | IMitgliedszeitraumFrontendDo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(MitgliedszeitraumFrontendDoService);
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

    it('should create a MitgliedszeitraumFrontendDo', () => {
      const mitgliedszeitraum = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(mitgliedszeitraum).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MitgliedszeitraumFrontendDo', () => {
      const mitgliedszeitraum = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(mitgliedszeitraum).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MitgliedszeitraumFrontendDo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MitgliedszeitraumFrontendDo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MitgliedszeitraumFrontendDo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMitgliedszeitraumFrontendDoToCollectionIfMissing', () => {
      it('should add a MitgliedszeitraumFrontendDo to an empty array', () => {
        const mitgliedszeitraum: IMitgliedszeitraumFrontendDo = sampleWithRequiredData;
        expectedResult = service.addMitgliedszeitraumFrontendDoToCollectionIfMissing([], mitgliedszeitraum);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(mitgliedszeitraum);
      });

      it('should not add a MitgliedszeitraumFrontendDo to an array that contains it', () => {
        const mitgliedszeitraum: IMitgliedszeitraumFrontendDo = sampleWithRequiredData;
        const mitgliedszeitraumCollection: IMitgliedszeitraumFrontendDo[] = [
          {
            ...mitgliedszeitraum,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMitgliedszeitraumFrontendDoToCollectionIfMissing(mitgliedszeitraumCollection, mitgliedszeitraum);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MitgliedszeitraumFrontendDo to an array that doesn't contain it", () => {
        const mitgliedszeitraum: IMitgliedszeitraumFrontendDo = sampleWithRequiredData;
        const mitgliedszeitraumCollection: IMitgliedszeitraumFrontendDo[] = [sampleWithPartialData];
        expectedResult = service.addMitgliedszeitraumFrontendDoToCollectionIfMissing(mitgliedszeitraumCollection, mitgliedszeitraum);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(mitgliedszeitraum);
      });

      it('should add only unique MitgliedszeitraumFrontendDo to an array', () => {
        const mitgliedszeitraumArray: IMitgliedszeitraumFrontendDo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const mitgliedszeitraumCollection: IMitgliedszeitraumFrontendDo[] = [sampleWithRequiredData];
        expectedResult = service.addMitgliedszeitraumFrontendDoToCollectionIfMissing(
          mitgliedszeitraumCollection,
          ...mitgliedszeitraumArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const mitgliedszeitraum: IMitgliedszeitraumFrontendDo = sampleWithRequiredData;
        const mitgliedszeitraum2: IMitgliedszeitraumFrontendDo = sampleWithPartialData;
        expectedResult = service.addMitgliedszeitraumFrontendDoToCollectionIfMissing([], mitgliedszeitraum, mitgliedszeitraum2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(mitgliedszeitraum);
        expect(expectedResult).toContain(mitgliedszeitraum2);
      });

      it('should accept null and undefined values', () => {
        const mitgliedszeitraum: IMitgliedszeitraumFrontendDo = sampleWithRequiredData;
        expectedResult = service.addMitgliedszeitraumFrontendDoToCollectionIfMissing([], null, mitgliedszeitraum, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(mitgliedszeitraum);
      });

      it('should return initial array if no MitgliedszeitraumFrontendDo is added', () => {
        const mitgliedszeitraumCollection: IMitgliedszeitraumFrontendDo[] = [sampleWithRequiredData];
        expectedResult = service.addMitgliedszeitraumFrontendDoToCollectionIfMissing(mitgliedszeitraumCollection, undefined, null);
        expect(expectedResult).toEqual(mitgliedszeitraumCollection);
      });
    });

    describe('compareMitgliedszeitraumFrontendDo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMitgliedszeitraumFrontendDo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 2991 };
        const entity2 = null;

        const compareResult1 = service.compareMitgliedszeitraumFrontendDo(entity1, entity2);
        const compareResult2 = service.compareMitgliedszeitraumFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 2991 };
        const entity2 = { id: 25825 };

        const compareResult1 = service.compareMitgliedszeitraumFrontendDo(entity1, entity2);
        const compareResult2 = service.compareMitgliedszeitraumFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 2991 };
        const entity2 = { id: 2991 };

        const compareResult1 = service.compareMitgliedszeitraumFrontendDo(entity1, entity2);
        const compareResult2 = service.compareMitgliedszeitraumFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
