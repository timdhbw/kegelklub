import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IKegelclubtreffenFrontendDo } from '../kegelclubtreffen-frontend-do.model';
import { KegelclubtreffenFrontendDoService } from '../service/kegelclubtreffen-frontend-do.service';

const kegelclubtreffenResolve = (route: ActivatedRouteSnapshot): Observable<null | IKegelclubtreffenFrontendDo> => {
  const id = route.params.id;
  if (id) {
    return inject(KegelclubtreffenFrontendDoService)
      .find(id)
      .pipe(
        mergeMap((kegelclubtreffen: HttpResponse<IKegelclubtreffenFrontendDo>) => {
          if (kegelclubtreffen.body) {
            return of(kegelclubtreffen.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default kegelclubtreffenResolve;
