import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IBildFrontendDo } from '../bild-frontend-do.model';
import { BildFrontendDoService } from '../service/bild-frontend-do.service';

@Component({
  templateUrl: './bild-frontend-do-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class BildFrontendDoDeleteDialogComponent {
  bild?: IBildFrontendDo;

  protected bildService = inject(BildFrontendDoService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bildService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
