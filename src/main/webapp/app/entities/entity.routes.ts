import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'kegelclubApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'bild-frontend-do',
    data: { pageTitle: 'kegelclubApp.bild.home.title' },
    loadChildren: () => import('./bild-frontend-do/bild-frontend-do.routes'),
  },
  {
    path: 'kegelclubtreffen-frontend-do',
    data: { pageTitle: 'kegelclubApp.kegelclubtreffen.home.title' },
    loadChildren: () => import('./kegelclubtreffen-frontend-do/kegelclubtreffen-frontend-do.routes'),
  },
  {
    path: 'kegler-frontend-do',
    data: { pageTitle: 'kegelclubApp.kegler.home.title' },
    loadChildren: () => import('./kegler-frontend-do/kegler-frontend-do.routes'),
  },
  {
    path: 'mitgliedszeitraum-frontend-do',
    data: { pageTitle: 'kegelclubApp.mitgliedszeitraum.home.title' },
    loadChildren: () => import('./mitgliedszeitraum-frontend-do/mitgliedszeitraum-frontend-do.routes'),
  },
  {
    path: 'wurf-ergebnis-frontend-do',
    data: { pageTitle: 'kegelclubApp.wurfErgebnis.home.title' },
    loadChildren: () => import('./wurf-ergebnis-frontend-do/wurf-ergebnis-frontend-do.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
