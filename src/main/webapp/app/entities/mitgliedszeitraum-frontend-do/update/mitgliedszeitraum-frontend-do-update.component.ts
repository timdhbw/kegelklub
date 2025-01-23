import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IKeglerFrontendDo } from 'app/entities/kegler-frontend-do/kegler-frontend-do.model';
import { KeglerFrontendDoService } from 'app/entities/kegler-frontend-do/service/kegler-frontend-do.service';
import { IMitgliedszeitraumFrontendDo } from '../mitgliedszeitraum-frontend-do.model';
import { MitgliedszeitraumFrontendDoService } from '../service/mitgliedszeitraum-frontend-do.service';
import { MitgliedszeitraumFrontendDoFormGroup, MitgliedszeitraumFrontendDoFormService } from './mitgliedszeitraum-frontend-do-form.service';

@Component({
  selector: 'jhi-mitgliedszeitraum-frontend-do-update',
  templateUrl: './mitgliedszeitraum-frontend-do-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class MitgliedszeitraumFrontendDoUpdateComponent implements OnInit {
  isSaving = false;
  mitgliedszeitraum: IMitgliedszeitraumFrontendDo | null = null;

  keglersSharedCollection: IKeglerFrontendDo[] = [];

  protected mitgliedszeitraumService = inject(MitgliedszeitraumFrontendDoService);
  protected mitgliedszeitraumFormService = inject(MitgliedszeitraumFrontendDoFormService);
  protected keglerService = inject(KeglerFrontendDoService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: MitgliedszeitraumFrontendDoFormGroup = this.mitgliedszeitraumFormService.createMitgliedszeitraumFrontendDoFormGroup();

  compareKeglerFrontendDo = (o1: IKeglerFrontendDo | null, o2: IKeglerFrontendDo | null): boolean =>
    this.keglerService.compareKeglerFrontendDo(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mitgliedszeitraum }) => {
      this.mitgliedszeitraum = mitgliedszeitraum;
      if (mitgliedszeitraum) {
        this.updateForm(mitgliedszeitraum);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mitgliedszeitraum = this.mitgliedszeitraumFormService.getMitgliedszeitraumFrontendDo(this.editForm);
    if (mitgliedszeitraum.id !== null) {
      this.subscribeToSaveResponse(this.mitgliedszeitraumService.update(mitgliedszeitraum));
    } else {
      this.subscribeToSaveResponse(this.mitgliedszeitraumService.create(mitgliedszeitraum));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMitgliedszeitraumFrontendDo>>): void {
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

  protected updateForm(mitgliedszeitraum: IMitgliedszeitraumFrontendDo): void {
    this.mitgliedszeitraum = mitgliedszeitraum;
    this.mitgliedszeitraumFormService.resetForm(this.editForm, mitgliedszeitraum);

    this.keglersSharedCollection = this.keglerService.addKeglerFrontendDoToCollectionIfMissing<IKeglerFrontendDo>(
      this.keglersSharedCollection,
      mitgliedszeitraum.kegler,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.keglerService
      .query()
      .pipe(map((res: HttpResponse<IKeglerFrontendDo[]>) => res.body ?? []))
      .pipe(
        map((keglers: IKeglerFrontendDo[]) =>
          this.keglerService.addKeglerFrontendDoToCollectionIfMissing<IKeglerFrontendDo>(keglers, this.mitgliedszeitraum?.kegler),
        ),
      )
      .subscribe((keglers: IKeglerFrontendDo[]) => (this.keglersSharedCollection = keglers));
  }
}
