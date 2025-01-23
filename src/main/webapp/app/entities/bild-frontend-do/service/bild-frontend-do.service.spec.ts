import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IBildFrontendDo } from '../bild-frontend-do.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../bild-frontend-do.test-samples';

import { BildFrontendDoService, RestBildFrontendDo } from './bild-frontend-do.service';

const requireRestSample: RestBildFrontendDo = {
  ...sampleWithRequiredData,
  erstellung: sampleWithRequiredData.erstellung?.toJSON(),
};

describe('BildFrontendDo Service', () => {
  let service: BildFrontendDoService;
  let httpMock: HttpTestingController;
  let expectedResult: IBildFrontendDo | IBildFrontendDo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(BildFrontendDoService);
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

    it('should create a BildFrontendDo', () => {
      const bild = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(bild).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a BildFrontendDo', () => {
      const bild = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(bild).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a BildFrontendDo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of BildFrontendDo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a BildFrontendDo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addBildFrontendDoToCollectionIfMissing', () => {
      it('should add a BildFrontendDo to an empty array', () => {
        const bild: IBildFrontendDo = sampleWithRequiredData;
        expectedResult = service.addBildFrontendDoToCollectionIfMissing([], bild);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bild);
      });

      it('should not add a BildFrontendDo to an array that contains it', () => {
        const bild: IBildFrontendDo = sampleWithRequiredData;
        const bildCollection: IBildFrontendDo[] = [
          {
            ...bild,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addBildFrontendDoToCollectionIfMissing(bildCollection, bild);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a BildFrontendDo to an array that doesn't contain it", () => {
        const bild: IBildFrontendDo = sampleWithRequiredData;
        const bildCollection: IBildFrontendDo[] = [sampleWithPartialData];
        expectedResult = service.addBildFrontendDoToCollectionIfMissing(bildCollection, bild);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bild);
      });

      it('should add only unique BildFrontendDo to an array', () => {
        const bildArray: IBildFrontendDo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const bildCollection: IBildFrontendDo[] = [sampleWithRequiredData];
        expectedResult = service.addBildFrontendDoToCollectionIfMissing(bildCollection, ...bildArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const bild: IBildFrontendDo = sampleWithRequiredData;
        const bild2: IBildFrontendDo = sampleWithPartialData;
        expectedResult = service.addBildFrontendDoToCollectionIfMissing([], bild, bild2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bild);
        expect(expectedResult).toContain(bild2);
      });

      it('should accept null and undefined values', () => {
        const bild: IBildFrontendDo = sampleWithRequiredData;
        expectedResult = service.addBildFrontendDoToCollectionIfMissing([], null, bild, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bild);
      });

      it('should return initial array if no BildFrontendDo is added', () => {
        const bildCollection: IBildFrontendDo[] = [sampleWithRequiredData];
        expectedResult = service.addBildFrontendDoToCollectionIfMissing(bildCollection, undefined, null);
        expect(expectedResult).toEqual(bildCollection);
      });
    });

    describe('compareBildFrontendDo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareBildFrontendDo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 10466 };
        const entity2 = null;

        const compareResult1 = service.compareBildFrontendDo(entity1, entity2);
        const compareResult2 = service.compareBildFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 10466 };
        const entity2 = { id: 9596 };

        const compareResult1 = service.compareBildFrontendDo(entity1, entity2);
        const compareResult2 = service.compareBildFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 10466 };
        const entity2 = { id: 10466 };

        const compareResult1 = service.compareBildFrontendDo(entity1, entity2);
        const compareResult2 = service.compareBildFrontendDo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
