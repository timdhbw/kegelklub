import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IWurfErgebnisFrontendDo } from '../wurf-ergebnis-frontend-do.model';

@Component({
  selector: 'jhi-wurf-ergebnis-frontend-do-detail',
  templateUrl: './wurf-ergebnis-frontend-do-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class WurfErgebnisFrontendDoDetailComponent {
  wurfErgebnis = input<IWurfErgebnisFrontendDo | null>(null);

  previousState(): void {
    window.history.back();
  }
}
