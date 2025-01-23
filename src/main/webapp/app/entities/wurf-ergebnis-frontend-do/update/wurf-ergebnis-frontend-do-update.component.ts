import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IKeglerFrontendDo } from 'app/entities/kegler-frontend-do/kegler-frontend-do.model';
import { KeglerFrontendDoService } from 'app/entities/kegler-frontend-do/service/kegler-frontend-do.service';
import { IKegelclubtreffenFrontendDo } from 'app/entities/kegelclubtreffen-frontend-do/kegelclubtreffen-frontend-do.model';
import { KegelclubtreffenFrontendDoService } from 'app/entities/kegelclubtreffen-frontend-do/service/kegelclubtreffen-frontend-do.service';
import { WurfErgebnisFrontendDoService } from '../service/wurf-ergebnis-frontend-do.service';
import { IWurfErgebnisFrontendDo } from '../wurf-ergebnis-frontend-do.model';
import { WurfErgebnisFrontendDoFormGroup, WurfErgebnisFrontendDoFormService } from './wurf-ergebnis-frontend-do-form.service';

@Component({
  selector: 'jhi-wurf-ergebnis-frontend-do-update',
  templateUrl: './wurf-ergebnis-frontend-do-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class WurfErgebnisFrontendDoUpdateComponent implements OnInit {
  isSaving = false;
  wurfErgebnis: IWurfErgebnisFrontendDo | null = null;

  keglersSharedCollection: IKeglerFrontendDo[] = [];
  kegelclubtreffensSharedCollection: IKegelclubtreffenFrontendDo[] = [];

  protected wurfErgebnisService = inject(WurfErgebnisFrontendDoService);
  protected wurfErgebnisFormService = inject(WurfErgebnisFrontendDoFormService);
  protected keglerService = inject(KeglerFrontendDoService);
  protected kegelclubtreffenService = inject(KegelclubtreffenFrontendDoService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: WurfErgebnisFrontendDoFormGroup = this.wurfErgebnisFormService.createWurfErgebnisFrontendDoFormGroup();

  compareKeglerFrontendDo = (o1: IKeglerFrontendDo | null, o2: IKeglerFrontendDo | null): boolean =>
    this.keglerService.compareKeglerFrontendDo(o1, o2);

  compareKegelclubtreffenFrontendDo = (o1: IKegelclubtreffenFrontendDo | null, o2: IKegelclubtreffenFrontendDo | null): boolean =>
    this.kegelclubtreffenService.compareKegelclubtreffenFrontendDo(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wurfErgebnis }) => {
      this.wurfErgebnis = wurfErgebnis;
      if (wurfErgebnis) {
        this.updateForm(wurfErgebnis);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wurfErgebnis = this.wurfErgebnisFormService.getWurfErgebnisFrontendDo(this.editForm);
    if (wurfErgebnis.id !== null) {
      this.subscribeToSaveResponse(this.wurfErgebnisService.update(wurfErgebnis));
    } else {
      this.subscribeToSaveResponse(this.wurfErgebnisService.create(wurfErgebnis));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWurfErgebnisFrontendDo>>): void {
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

  protected updateForm(wurfErgebnis: IWurfErgebnisFrontendDo): void {
    this.wurfErgebnis = wurfErgebnis;
    this.wurfErgebnisFormService.resetForm(this.editForm, wurfErgebnis);

    this.keglersSharedCollection = this.keglerService.addKeglerFrontendDoToCollectionIfMissing<IKeglerFrontendDo>(
      this.keglersSharedCollection,
      wurfErgebnis.kegler,
    );
    this.kegelclubtreffensSharedCollection =
      this.kegelclubtreffenService.addKegelclubtreffenFrontendDoToCollectionIfMissing<IKegelclubtreffenFrontendDo>(
        this.kegelclubtreffensSharedCollection,
        wurfErgebnis.kegelclubtreffen,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.keglerService
      .query()
      .pipe(map((res: HttpResponse<IKeglerFrontendDo[]>) => res.body ?? []))
      .pipe(
        map((keglers: IKeglerFrontendDo[]) =>
          this.keglerService.addKeglerFrontendDoToCollectionIfMissing<IKeglerFrontendDo>(keglers, this.wurfErgebnis?.kegler),
        ),
      )
      .subscribe((keglers: IKeglerFrontendDo[]) => (this.keglersSharedCollection = keglers));

    this.kegelclubtreffenService
      .query()
      .pipe(map((res: HttpResponse<IKegelclubtreffenFrontendDo[]>) => res.body ?? []))
      .pipe(
        map((kegelclubtreffens: IKegelclubtreffenFrontendDo[]) =>
          this.kegelclubtreffenService.addKegelclubtreffenFrontendDoToCollectionIfMissing<IKegelclubtreffenFrontendDo>(
            kegelclubtreffens,
            this.wurfErgebnis?.kegelclubtreffen,
          ),
        ),
      )
      .subscribe((kegelclubtreffens: IKegelclubtreffenFrontendDo[]) => (this.kegelclubtreffensSharedCollection = kegelclubtreffens));
  }
}
