import { TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IWurfErgebnisFrontendDo } from '../wurf-ergebnis-frontend-do.model';
import { WurfErgebnisFrontendDoService } from '../service/wurf-ergebnis-frontend-do.service';

import wurfErgebnisResolve from './wurf-ergebnis-frontend-do-routing-resolve.service';

describe('WurfErgebnisFrontendDo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: WurfErgebnisFrontendDoService;
  let resultWurfErgebnisFrontendDo: IWurfErgebnisFrontendDo | null | undefined;

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
    service = TestBed.inject(WurfErgebnisFrontendDoService);
    resultWurfErgebnisFrontendDo = undefined;
  });

  describe('resolve', () => {
    it('should return IWurfErgebnisFrontendDo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        wurfErgebnisResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultWurfErgebnisFrontendDo = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultWurfErgebnisFrontendDo).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        wurfErgebnisResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultWurfErgebnisFrontendDo = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toHaveBeenCalled();
      expect(resultWurfErgebnisFrontendDo).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IWurfErgebnisFrontendDo>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        wurfErgebnisResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultWurfErgebnisFrontendDo = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultWurfErgebnisFrontendDo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
