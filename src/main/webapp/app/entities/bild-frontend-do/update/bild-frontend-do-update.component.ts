import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IKegelclubtreffenFrontendDo } from 'app/entities/kegelclubtreffen-frontend-do/kegelclubtreffen-frontend-do.model';
import { KegelclubtreffenFrontendDoService } from 'app/entities/kegelclubtreffen-frontend-do/service/kegelclubtreffen-frontend-do.service';
import { BildFrontendDoService } from '../service/bild-frontend-do.service';
import { IBildFrontendDo } from '../bild-frontend-do.model';
import { BildFrontendDoFormGroup, BildFrontendDoFormService } from './bild-frontend-do-form.service';

@Component({
  selector: 'jhi-bild-frontend-do-update',
  templateUrl: './bild-frontend-do-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class BildFrontendDoUpdateComponent implements OnInit {
  isSaving = false;
  bild: IBildFrontendDo | null = null;

  kegelclubtreffensSharedCollection: IKegelclubtreffenFrontendDo[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected bildService = inject(BildFrontendDoService);
  protected bildFormService = inject(BildFrontendDoFormService);
  protected kegelclubtreffenService = inject(KegelclubtreffenFrontendDoService);
  protected elementRef = inject(ElementRef);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BildFrontendDoFormGroup = this.bildFormService.createBildFrontendDoFormGroup();

  compareKegelclubtreffenFrontendDo = (o1: IKegelclubtreffenFrontendDo | null, o2: IKegelclubtreffenFrontendDo | null): boolean =>
    this.kegelclubtreffenService.compareKegelclubtreffenFrontendDo(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bild }) => {
      this.bild = bild;
      if (bild) {
        this.updateForm(bild);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('kegelclubApp.error', { ...err, key: `error.file.${err.key}` })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector(`#${idInput}`)) {
      this.elementRef.nativeElement.querySelector(`#${idInput}`).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bild = this.bildFormService.getBildFrontendDo(this.editForm);
    if (bild.id !== null) {
      this.subscribeToSaveResponse(this.bildService.update(bild));
    } else {
      this.subscribeToSaveResponse(this.bildService.create(bild));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBildFrontendDo>>): void {
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

  protected updateForm(bild: IBildFrontendDo): void {
    this.bild = bild;
    this.bildFormService.resetForm(this.editForm, bild);

    this.kegelclubtreffensSharedCollection =
      this.kegelclubtreffenService.addKegelclubtreffenFrontendDoToCollectionIfMissing<IKegelclubtreffenFrontendDo>(
        this.kegelclubtreffensSharedCollection,
        bild.treffen,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.kegelclubtreffenService
      .query()
      .pipe(map((res: HttpResponse<IKegelclubtreffenFrontendDo[]>) => res.body ?? []))
      .pipe(
        map((kegelclubtreffens: IKegelclubtreffenFrontendDo[]) =>
          this.kegelclubtreffenService.addKegelclubtreffenFrontendDoToCollectionIfMissing<IKegelclubtreffenFrontendDo>(
            kegelclubtreffens,
            this.bild?.treffen,
          ),
        ),
      )
      .subscribe((kegelclubtreffens: IKegelclubtreffenFrontendDo[]) => (this.kegelclubtreffensSharedCollection = kegelclubtreffens));
  }
}
