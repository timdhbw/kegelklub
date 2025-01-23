import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBildFrontendDo } from '../bild-frontend-do.model';
import { BildFrontendDoService } from '../service/bild-frontend-do.service';

const bildResolve = (route: ActivatedRouteSnapshot): Observable<null | IBildFrontendDo> => {
  const id = route.params.id;
  if (id) {
    return inject(BildFrontendDoService)
      .find(id)
      .pipe(
        mergeMap((bild: HttpResponse<IBildFrontendDo>) => {
          if (bild.body) {
            return of(bild.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default bildResolve;
