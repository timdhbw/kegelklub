import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IKeglerFrontendDo } from '../kegler-frontend-do.model';
import { KeglerFrontendDoService } from '../service/kegler-frontend-do.service';
import { KeglerFrontendDoFormGroup, KeglerFrontendDoFormService } from './kegler-frontend-do-form.service';

@Component({
  selector: 'jhi-kegler-frontend-do-update',
  templateUrl: './kegler-frontend-do-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class KeglerFrontendDoUpdateComponent implements OnInit {
  isSaving = false;
  kegler: IKeglerFrontendDo | null = null;

  protected keglerService = inject(KeglerFrontendDoService);
  protected keglerFormService = inject(KeglerFrontendDoFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: KeglerFrontendDoFormGroup = this.keglerFormService.createKeglerFrontendDoFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ kegler }) => {
      this.kegler = kegler;
      if (kegler) {
        this.updateForm(kegler);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const kegler = this.keglerFormService.getKeglerFrontendDo(this.editForm);
    if (kegler.id !== null) {
      this.subscribeToSaveResponse(this.keglerService.update(kegler));
    } else {
      this.subscribeToSaveResponse(this.keglerService.create(kegler));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKeglerFrontendDo>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(kegler: IKeglerFrontendDo): void {
    this.kegler = kegler;
    this.keglerFormService.resetForm(this.editForm, kegler);
  }
}
