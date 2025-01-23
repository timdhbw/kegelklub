import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWurfErgebnisFrontendDo } from '../wurf-ergebnis-frontend-do.model';
import { WurfErgebnisFrontendDoService } from '../service/wurf-ergebnis-frontend-do.service';

const wurfErgebnisResolve = (route: ActivatedRouteSnapshot): Observable<null | IWurfErgebnisFrontendDo> => {
  const id = route.params.id;
  if (id) {
    return inject(WurfErgebnisFrontendDoService)
      .find(id)
      .pipe(
        mergeMap((wurfErgebnis: HttpResponse<IWurfErgebnisFrontendDo>) => {
          if (wurfErgebnis.body) {
            return of(wurfErgebnis.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default wurfErgebnisResolve;
