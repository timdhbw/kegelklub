import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IKeglerFrontendDo } from '../kegler-frontend-do.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../kegler-frontend-do.test-samples';

import { KeglerFrontendDoService } from './kegler-frontend-do.service';

const requireRestSample: IKeglerFrontendDo = {
  ...sampleWithRequiredData,
};

describe('KeglerFrontendDo Service', () => {
  let service: KeglerFrontendDoService;
  let httpMock: HttpTestingController;
  let expectedResult: IKeglerFrontendDo | IKeglerFrontendDo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(KeglerFrontendDoService);
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

    it('should create a KeglerFrontendDo', () => {
      const kegler = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(kegler).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a KeglerFrontendDo', () => {
      const kegler = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(kegler).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a KeglerFrontendDo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of KeglerFrontendDo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a KeglerFrontendDo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addKeglerFrontendDoToCollectionIfMissing', () => {
      it('should add a KeglerFrontendDo to an empty array', () => {
        const kegler: IKeglerFrontendDo = sampleWithRequiredData;
        expectedResult = service.addKeglerFrontendDoToCollectionIfMissing([], kegler);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(kegler);
      });

      it('should not add a KeglerFrontendDo to an array that contains it', () => {
        const kegler: IKeglerFrontendDo = sampleWithRequiredData;
        const keglerCollection: IKeglerFrontendDo[] = [
          {
            ...kegler,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addKeglerFrontendDoToCollectionIfMissing(keglerCollection, kegler);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a KeglerFrontendDo to an array that doesn't contain it", () => {
        const kegler: IKeglerFrontendDo = sampleWithRequiredData;
        const keglerCollection: IKeglerFrontendDo[] = [sampleWithPartialData];
        expectedResult = service.addKeglerFrontendDoToCollectionIfMissing(keglerCollection, kegler);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(kegler);
      });

      it('should add only unique KeglerFrontendDo to an array', () => {
        const keglerArray: IKeglerFrontendDo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const keglerCollection: IKeglerFrontendDo[] = [sampleWithRequiredData];
        expectedResult = service.addKeglerFrontendDoToCollectionIfMissing(keglerCollection, ...keglerArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const kegler: IKeglerFrontendDo = sampleWithRequiredData;
        const kegler2: IKeglerFrontendDo = sampleWithPartialData;
        expectedResult = service.addKeglerFrontendDoToCollectionIfMissing([], kegler, kegler2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(kegler);
        expect(expectedResult).toContain(kegler2);
      });

      it('should accept null and undefined values', () => {
        const kegler: IKeglerFrontendDo = sampleWithRequiredData;
        expectedResult = service.addKeglerFrontendDoToCollectionIfMissing([], null, kegler, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(kegler);
      });

      it('should return initial array if no KeglerFrontendDo is added', () => {
        const keglerCollection: IKeglerFrontendDo[] = [sampleWithRequiredData];
        expectedResult = service.addKeglerFrontendDoToCollectionIfMissing(keglerCollection, undefined, null);
        expect(expectedResult).toEqual(keglerCollection);
      });
    });

    describe('compareKeglerFrontendDo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareKeglerFrontendDo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 12905 };
        const entity2 = null;

        const compareResult1 = service.compareKeglerFrontendDo(entity1, entity2);
        const compareResult2 = service.compareKeglerFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 12905 };
        const entity2 = { id: 17453 };

        const compareResult1 = service.compareKeglerFrontendDo(entity1, entity2);
        const compareResult2 = service.compareKeglerFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 12905 };
        const entity2 = { id: 12905 };

        const compareResult1 = service.compareKeglerFrontendDo(entity1, entity2);
        const compareResult2 = service.compareKeglerFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
