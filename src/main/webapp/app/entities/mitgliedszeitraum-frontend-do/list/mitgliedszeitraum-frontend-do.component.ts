import { Component, NgZone, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { Observable, Subscription, combineLatest, filter, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { SortByDirective, SortDirective, SortService, type SortState, sortStateSignal } from 'app/shared/sort';
import { FormatMediumDatePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { DEFAULT_SORT_DATA, ITEM_DELETED_EVENT, SORT } from 'app/config/navigation.constants';
import { IMitgliedszeitraumFrontendDo } from '../mitgliedszeitraum-frontend-do.model';
import { EntityArrayResponseType, MitgliedszeitraumFrontendDoService } from '../service/mitgliedszeitraum-frontend-do.service';
import { MitgliedszeitraumFrontendDoDeleteDialogComponent } from '../delete/mitgliedszeitraum-frontend-do-delete-dialog.component';

@Component({
  selector: 'jhi-mitgliedszeitraum-frontend-do',
  templateUrl: './mitgliedszeitraum-frontend-do.component.html',
  imports: [RouterModule, FormsModule, SharedModule, SortDirective, SortByDirective, FormatMediumDatePipe],
})
export class MitgliedszeitraumFrontendDoComponent implements OnInit {
  subscription: Subscription | null = null;
  mitgliedszeitraums = signal<IMitgliedszeitraumFrontendDo[]>([]);
  isLoading = false;

  sortState = sortStateSignal({});

  public readonly router = inject(Router);
  protected readonly mitgliedszeitraumService = inject(MitgliedszeitraumFrontendDoService);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly sortService = inject(SortService);
  protected modalService = inject(NgbModal);
  protected ngZone = inject(NgZone);

  trackId = (item: IMitgliedszeitraumFrontendDo): number => this.mitgliedszeitraumService.getMitgliedszeitraumFrontendDoIdentifier(item);

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        tap(() => {
          if (this.mitgliedszeitraums().length === 0) {
            this.load();
          } else {
            this.mitgliedszeitraums.set(this.refineData(this.mitgliedszeitraums()));
          }
        }),
      )
      .subscribe();
  }

  delete(mitgliedszeitraum: IMitgliedszeitraumFrontendDo): void {
    const modalRef = this.modalService.open(MitgliedszeitraumFrontendDoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mitgliedszeitraum = mitgliedszeitraum;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        tap(() => this.load()),
      )
      .subscribe();
  }

  load(): void {
    this.queryBackend().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(event: SortState): void {
    this.handleNavigation(event);
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    this.sortState.set(this.sortService.parseSortParam(params.get(SORT) ?? data[DEFAULT_SORT_DATA]));
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.mitgliedszeitraums.set(this.refineData(dataFromBody));
  }

  protected refineData(data: IMitgliedszeitraumFrontendDo[]): IMitgliedszeitraumFrontendDo[] {
    const { predicate, order } = this.sortState();
    return predicate && order ? data.sort(this.sortService.startSort({ predicate, order })) : data;
  }

  protected fillComponentAttributesFromResponseBody(data: IMitgliedszeitraumFrontendDo[] | null): IMitgliedszeitraumFrontendDo[] {
    return data ?? [];
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    return this.mitgliedszeitraumService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(sortState: SortState): void {
    const queryParamsObj = {
      sort: this.sortService.buildSortParam(sortState),
    };

    this.ngZone.run(() => {
      this.router.navigate(['./'], {
        relativeTo: this.activatedRoute,
        queryParams: queryParamsObj,
      });
    });
  }
}
