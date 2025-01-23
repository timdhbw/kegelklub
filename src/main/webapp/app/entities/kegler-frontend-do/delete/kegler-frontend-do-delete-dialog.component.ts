import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IKeglerFrontendDo } from '../kegler-frontend-do.model';
import { KeglerFrontendDoService } from '../service/kegler-frontend-do.service';

@Component({
  templateUrl: './kegler-frontend-do-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class KeglerFrontendDoDeleteDialogComponent {
  kegler?: IKeglerFrontendDo;

  protected keglerService = inject(KeglerFrontendDoService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.keglerService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
