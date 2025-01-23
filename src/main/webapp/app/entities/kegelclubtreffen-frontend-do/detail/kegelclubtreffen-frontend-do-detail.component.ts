import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { IKegelclubtreffenFrontendDo } from '../kegelclubtreffen-frontend-do.model';

@Component({
  selector: 'jhi-kegelclubtreffen-frontend-do-detail',
  templateUrl: './kegelclubtreffen-frontend-do-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class KegelclubtreffenFrontendDoDetailComponent {
  kegelclubtreffen = input<IKegelclubtreffenFrontendDo | null>(null);

  previousState(): void {
    window.history.back();
  }
}
