import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatePipe } from 'app/shared/date';
import { IMitgliedszeitraumFrontendDo } from '../mitgliedszeitraum-frontend-do.model';

@Component({
  selector: 'jhi-mitgliedszeitraum-frontend-do-detail',
  templateUrl: './mitgliedszeitraum-frontend-do-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatePipe],
})
export class MitgliedszeitraumFrontendDoDetailComponent {
  mitgliedszeitraum = input<IMitgliedszeitraumFrontendDo | null>(null);

  previousState(): void {
    window.history.back();
  }
}
