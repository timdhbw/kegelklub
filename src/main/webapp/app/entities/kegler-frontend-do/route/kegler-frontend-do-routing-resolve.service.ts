import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IKeglerFrontendDo } from '../kegler-frontend-do.model';
import { KeglerFrontendDoService } from '../service/kegler-frontend-do.service';

const keglerResolve = (route: ActivatedRouteSnapshot): Observable<null | IKeglerFrontendDo> => {
  const id = route.params.id;
  if (id) {
    return inject(KeglerFrontendDoService)
      .find(id)
      .pipe(
        mergeMap((kegler: HttpResponse<IKeglerFrontendDo>) => {
          if (kegler.body) {
            return of(kegler.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default keglerResolve;
