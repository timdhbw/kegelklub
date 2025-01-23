import { Component, NgZone, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { Observable, Subscription, combineLatest, filter, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { SortByDirective, SortDirective, SortService, type SortState, sortStateSignal } from 'app/shared/sort';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { DEFAULT_SORT_DATA, ITEM_DELETED_EVENT, SORT } from 'app/config/navigation.constants';
import { IKegelclubtreffenFrontendDo } from '../kegelclubtreffen-frontend-do.model';
import { EntityArrayResponseType, KegelclubtreffenFrontendDoService } from '../service/kegelclubtreffen-frontend-do.service';
import { KegelclubtreffenFrontendDoDeleteDialogComponent } from '../delete/kegelclubtreffen-frontend-do-delete-dialog.component';

@Component({
  selector: 'jhi-kegelclubtreffen-frontend-do',
  templateUrl: './kegelclubtreffen-frontend-do.component.html',
  imports: [RouterModule, FormsModule, SharedModule, SortDirective, SortByDirective, FormatMediumDatetimePipe],
})
export class KegelclubtreffenFrontendDoComponent implements OnInit {
  subscription: Subscription | null = null;
  kegelclubtreffens = signal<IKegelclubtreffenFrontendDo[]>([]);
  isLoading = false;

  sortState = sortStateSignal({});

  public readonly router = inject(Router);
  protected readonly kegelclubtreffenService = inject(KegelclubtreffenFrontendDoService);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly sortService = inject(SortService);
  protected modalService = inject(NgbModal);
  protected ngZone = inject(NgZone);

  trackId = (item: IKegelclubtreffenFrontendDo): number => this.kegelclubtreffenService.getKegelclubtreffenFrontendDoIdentifier(item);

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        tap(() => {
          if (this.kegelclubtreffens().length === 0) {
            this.load();
          } else {
            this.kegelclubtreffens.set(this.refineData(this.kegelclubtreffens()));
          }
        }),
      )
      .subscribe();
  }

  delete(kegelclubtreffen: IKegelclubtreffenFrontendDo): void {
    const modalRef = this.modalService.open(KegelclubtreffenFrontendDoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.kegelclubtreffen = kegelclubtreffen;
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
    this.kegelclubtreffens.set(this.refineData(dataFromBody));
  }

  protected refineData(data: IKegelclubtreffenFrontendDo[]): IKegelclubtreffenFrontendDo[] {
    const { predicate, order } = this.sortState();
    return predicate && order ? data.sort(this.sortService.startSort({ predicate, order })) : data;
  }

  protected fillComponentAttributesFromResponseBody(data: IKegelclubtreffenFrontendDo[] | null): IKegelclubtreffenFrontendDo[] {
    return data ?? [];
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    return this.kegelclubtreffenService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
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
