import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IKegelclubtreffenFrontendDo } from '../kegelclubtreffen-frontend-do.model';
import { KegelclubtreffenFrontendDoService } from '../service/kegelclubtreffen-frontend-do.service';
import { KegelclubtreffenFrontendDoFormGroup, KegelclubtreffenFrontendDoFormService } from './kegelclubtreffen-frontend-do-form.service';

@Component({
  selector: 'jhi-kegelclubtreffen-frontend-do-update',
  templateUrl: './kegelclubtreffen-frontend-do-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class KegelclubtreffenFrontendDoUpdateComponent implements OnInit {
  isSaving = false;
  kegelclubtreffen: IKegelclubtreffenFrontendDo | null = null;

  protected kegelclubtreffenService = inject(KegelclubtreffenFrontendDoService);
  protected kegelclubtreffenFormService = inject(KegelclubtreffenFrontendDoFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: KegelclubtreffenFrontendDoFormGroup = this.kegelclubtreffenFormService.createKegelclubtreffenFrontendDoFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ kegelclubtreffen }) => {
      this.kegelclubtreffen = kegelclubtreffen;
      if (kegelclubtreffen) {
        this.updateForm(kegelclubtreffen);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const kegelclubtreffen = this.kegelclubtreffenFormService.getKegelclubtreffenFrontendDo(this.editForm);
    if (kegelclubtreffen.id !== null) {
      this.subscribeToSaveResponse(this.kegelclubtreffenService.update(kegelclubtreffen));
    } else {
      this.subscribeToSaveResponse(this.kegelclubtreffenService.create(kegelclubtreffen));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKegelclubtreffenFrontendDo>>): void {
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

  protected updateForm(kegelclubtreffen: IKegelclubtreffenFrontendDo): void {
    this.kegelclubtreffen = kegelclubtreffen;
    this.kegelclubtreffenFormService.resetForm(this.editForm, kegelclubtreffen);
  }
}
