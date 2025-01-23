import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import WurfErgebnisFrontendDoResolve from './route/wurf-ergebnis-frontend-do-routing-resolve.service';

const wurfErgebnisRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/wurf-ergebnis-frontend-do.component').then(m => m.WurfErgebnisFrontendDoComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/wurf-ergebnis-frontend-do-detail.component').then(m => m.WurfErgebnisFrontendDoDetailComponent),
    resolve: {
      wurfErgebnis: WurfErgebnisFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/wurf-ergebnis-frontend-do-update.component').then(m => m.WurfErgebnisFrontendDoUpdateComponent),
    resolve: {
      wurfErgebnis: WurfErgebnisFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/wurf-ergebnis-frontend-do-update.component').then(m => m.WurfErgebnisFrontendDoUpdateComponent),
    resolve: {
      wurfErgebnis: WurfErgebnisFrontendDoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default wurfErgebnisRoute;
