import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import MitgliedszeitraumFrontendDoResolve from './route/mitgliedszeitraum-frontend-do-routing-resolve.service';

const mitgliedszeitraumRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/mitgliedszeitraum-frontend-do.component').then(m => m.MitgliedszeitraumFrontendDoComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () =>
      import('./detail/mitgliedszeitraum-frontend-do-detail.component').then(m => m.MitgliedszeitraumFrontendDoDetailComponent),
    resolve: {
      mitgliedszeitraum: MitgliedszeitraumFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./update/mitgliedszeitraum-frontend-do-update.component').then(m => m.MitgliedszeitraumFrontendDoUpdateComponent),
    resolve: {
      mitgliedszeitraum: MitgliedszeitraumFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./update/mitgliedszeitraum-frontend-do-update.component').then(m => m.MitgliedszeitraumFrontendDoUpdateComponent),
    resolve: {
      mitgliedszeitraum: MitgliedszeitraumFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default mitgliedszeitraumRoute;
