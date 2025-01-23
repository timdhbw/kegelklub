import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IKegelclubtreffenFrontendDo } from '../kegelclubtreffen-frontend-do.model';
import { KegelclubtreffenFrontendDoService } from '../service/kegelclubtreffen-frontend-do.service';

@Component({
  templateUrl: './kegelclubtreffen-frontend-do-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class KegelclubtreffenFrontendDoDeleteDialogComponent {
  kegelclubtreffen?: IKegelclubtreffenFrontendDo;

  protected kegelclubtreffenService = inject(KegelclubtreffenFrontendDoService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.kegelclubtreffenService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
