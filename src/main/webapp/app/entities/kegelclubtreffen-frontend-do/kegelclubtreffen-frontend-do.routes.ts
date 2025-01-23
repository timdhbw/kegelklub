import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import KegelclubtreffenFrontendDoResolve from './route/kegelclubtreffen-frontend-do-routing-resolve.service';

const kegelclubtreffenRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/kegelclubtreffen-frontend-do.component').then(m => m.KegelclubtreffenFrontendDoComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () =>
      import('./detail/kegelclubtreffen-frontend-do-detail.component').then(m => m.KegelclubtreffenFrontendDoDetailComponent),
    resolve: {
      kegelclubtreffen: KegelclubtreffenFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./update/kegelclubtreffen-frontend-do-update.component').then(m => m.KegelclubtreffenFrontendDoUpdateComponent),
    resolve: {
      kegelclubtreffen: KegelclubtreffenFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./update/kegelclubtreffen-frontend-do-update.component').then(m => m.KegelclubtreffenFrontendDoUpdateComponent),
    resolve: {
      kegelclubtreffen: KegelclubtreffenFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default kegelclubtreffenRoute;
