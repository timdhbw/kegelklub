import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import BildFrontendDoResolve from './route/bild-frontend-do-routing-resolve.service';

const bildRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/bild-frontend-do.component').then(m => m.BildFrontendDoComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/bild-frontend-do-detail.component').then(m => m.BildFrontendDoDetailComponent),
    resolve: {
      bild: BildFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/bild-frontend-do-update.component').then(m => m.BildFrontendDoUpdateComponent),
    resolve: {
      bild: BildFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/bild-frontend-do-update.component').then(m => m.BildFrontendDoUpdateComponent),
    resolve: {
      bild: BildFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default bildRoute;
