import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IMitgliedszeitraumFrontendDo } from '../mitgliedszeitraum-frontend-do.model';
import { MitgliedszeitraumFrontendDoService } from '../service/mitgliedszeitraum-frontend-do.service';

@Component({
  templateUrl: './mitgliedszeitraum-frontend-do-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class MitgliedszeitraumFrontendDoDeleteDialogComponent {
  mitgliedszeitraum?: IMitgliedszeitraumFrontendDo;

  protected mitgliedszeitraumService = inject(MitgliedszeitraumFrontendDoService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.mitgliedszeitraumService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
