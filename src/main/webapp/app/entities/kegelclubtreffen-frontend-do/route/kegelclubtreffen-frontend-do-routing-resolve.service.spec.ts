import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IKegelclubtreffenFrontendDo } from '../kegelclubtreffen-frontend-do.model';
import { KegelclubtreffenFrontendDoService } from '../service/kegelclubtreffen-frontend-do.service';

import kegelclubtreffenResolve from './kegelclubtreffen-frontend-do-routing-resolve.service';

describe('KegelclubtreffenFrontendDo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: KegelclubtreffenFrontendDoService;
  let resultKegelclubtreffenFrontendDo: IKegelclubtreffenFrontendDo | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(KegelclubtreffenFrontendDoService);
    resultKegelclubtreffenFrontendDo = undefined;
  });

  describe('resolve', () => {
    it('should return IKegelclubtreffenFrontendDo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        kegelclubtreffenResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultKegelclubtreffenFrontendDo = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultKegelclubtreffenFrontendDo).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        kegelclubtreffenResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultKegelclubtreffenFrontendDo = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toHaveBeenCalled();
      expect(resultKegelclubtreffenFrontendDo).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IKegelclubtreffenFrontendDo>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        kegelclubtreffenResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultKegelclubtreffenFrontendDo = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultKegelclubtreffenFrontendDo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
