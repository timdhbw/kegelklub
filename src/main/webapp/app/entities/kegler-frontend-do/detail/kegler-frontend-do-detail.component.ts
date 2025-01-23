import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IKeglerFrontendDo } from '../kegler-frontend-do.model';

@Component({
  selector: 'jhi-kegler-frontend-do-detail',
  templateUrl: './kegler-frontend-do-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class KeglerFrontendDoDetailComponent {
  kegler = input<IKeglerFrontendDo | null>(null);

  previousState(): void {
    window.history.back();
  }
}
