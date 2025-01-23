import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMitgliedszeitraumFrontendDo } from '../mitgliedszeitraum-frontend-do.model';
import { MitgliedszeitraumFrontendDoService } from '../service/mitgliedszeitraum-frontend-do.service';

const mitgliedszeitraumResolve = (route: ActivatedRouteSnapshot): Observable<null | IMitgliedszeitraumFrontendDo> => {
  const id = route.params.id;
  if (id) {
    return inject(MitgliedszeitraumFrontendDoService)
      .find(id)
      .pipe(
        mergeMap((mitgliedszeitraum: HttpResponse<IMitgliedszeitraumFrontendDo>) => {
          if (mitgliedszeitraum.body) {
            return of(mitgliedszeitraum.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default mitgliedszeitraumResolve;
