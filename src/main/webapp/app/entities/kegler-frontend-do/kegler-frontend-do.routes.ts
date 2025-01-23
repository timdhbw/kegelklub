import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import KeglerFrontendDoResolve from './route/kegler-frontend-do-routing-resolve.service';

const keglerRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/kegler-frontend-do.component').then(m => m.KeglerFrontendDoComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/kegler-frontend-do-detail.component').then(m => m.KeglerFrontendDoDetailComponent),
    resolve: {
      kegler: KeglerFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/kegler-frontend-do-update.component').then(m => m.KeglerFrontendDoUpdateComponent),
    resolve: {
      kegler: KeglerFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/kegler-frontend-do-update.component').then(m => m.KeglerFrontendDoUpdateComponent),
    resolve: {
      kegler: KeglerFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default keglerRoute;
