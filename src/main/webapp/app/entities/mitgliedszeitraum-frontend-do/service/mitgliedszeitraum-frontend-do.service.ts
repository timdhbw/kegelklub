import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMitgliedszeitraumFrontendDo, NewMitgliedszeitraumFrontendDo } from '../mitgliedszeitraum-frontend-do.model';

export type PartialUpdateMitgliedszeitraumFrontendDo = Partial<IMitgliedszeitraumFrontendDo> & Pick<IMitgliedszeitraumFrontendDo, 'id'>;

type RestOf<T extends IMitgliedszeitraumFrontendDo | NewMitgliedszeitraumFrontendDo> = Omit<
  T,
  'startMitgliedschaft' | 'endeMitgliedschaft'
> & {
  startMitgliedschaft?: string | null;
  endeMitgliedschaft?: string | null;
};

export type RestMitgliedszeitraumFrontendDo = RestOf<IMitgliedszeitraumFrontendDo>;

export type NewRestMitgliedszeitraumFrontendDo = RestOf<NewMitgliedszeitraumFrontendDo>;

export type PartialUpdateRestMitgliedszeitraumFrontendDo = RestOf<PartialUpdateMitgliedszeitraumFrontendDo>;

export type EntityResponseType = HttpResponse<IMitgliedszeitraumFrontendDo>;
export type EntityArrayResponseType = HttpResponse<IMitgliedszeitraumFrontendDo[]>;

@Injectable({ providedIn: 'root' })
export class MitgliedszeitraumFrontendDoService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/mitgliedszeitraums');

  create(mitgliedszeitraum: NewMitgliedszeitraumFrontendDo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mitgliedszeitraum);
    return this.http
      .post<RestMitgliedszeitraumFrontendDo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(mitgliedszeitraum: IMitgliedszeitraumFrontendDo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mitgliedszeitraum);
    return this.http
      .put<RestMitgliedszeitraumFrontendDo>(
        `${this.resourceUrl}/${this.getMitgliedszeitraumFrontendDoIdentifier(mitgliedszeitraum)}`,
        copy,
        { observe: 'response' },
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(mitgliedszeitraum: PartialUpdateMitgliedszeitraumFrontendDo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mitgliedszeitraum);
    return this.http
      .patch<RestMitgliedszeitraumFrontendDo>(
        `${this.resourceUrl}/${this.getMitgliedszeitraumFrontendDoIdentifier(mitgliedszeitraum)}`,
        copy,
        { observe: 'response' },
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMitgliedszeitraumFrontendDo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMitgliedszeitraumFrontendDo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMitgliedszeitraumFrontendDoIdentifier(mitgliedszeitraum: Pick<IMitgliedszeitraumFrontendDo, 'id'>): number {
    return mitgliedszeitraum.id;
  }

  compareMitgliedszeitraumFrontendDo(
    o1: Pick<IMitgliedszeitraumFrontendDo, 'id'> | null,
    o2: Pick<IMitgliedszeitraumFrontendDo, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getMitgliedszeitraumFrontendDoIdentifier(o1) === this.getMitgliedszeitraumFrontendDoIdentifier(o2) : o1 === o2;
  }

  addMitgliedszeitraumFrontendDoToCollectionIfMissing<Type extends Pick<IMitgliedszeitraumFrontendDo, 'id'>>(
    mitgliedszeitraumCollection: Type[],
    ...mitgliedszeitraumsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const mitgliedszeitraums: Type[] = mitgliedszeitraumsToCheck.filter(isPresent);
    if (mitgliedszeitraums.length > 0) {
      const mitgliedszeitraumCollectionIdentifiers = mitgliedszeitraumCollection.map(mitgliedszeitraumItem =>
        this.getMitgliedszeitraumFrontendDoIdentifier(mitgliedszeitraumItem),
      );
      const mitgliedszeitraumsToAdd = mitgliedszeitraums.filter(mitgliedszeitraumItem => {
        const mitgliedszeitraumIdentifier = this.getMitgliedszeitraumFrontendDoIdentifier(mitgliedszeitraumItem);
        if (mitgliedszeitraumCollectionIdentifiers.includes(mitgliedszeitraumIdentifier)) {
          return false;
        }
        mitgliedszeitraumCollectionIdentifiers.push(mitgliedszeitraumIdentifier);
        return true;
      });
      return [...mitgliedszeitraumsToAdd, ...mitgliedszeitraumCollection];
    }
    return mitgliedszeitraumCollection;
  }

  protected convertDateFromClient<
    T extends IMitgliedszeitraumFrontendDo | NewMitgliedszeitraumFrontendDo | PartialUpdateMitgliedszeitraumFrontendDo,
  >(mitgliedszeitraum: T): RestOf<T> {
    return {
      ...mitgliedszeitraum,
      startMitgliedschaft: mitgliedszeitraum.startMitgliedschaft?.format(DATE_FORMAT) ?? null,
      endeMitgliedschaft: mitgliedszeitraum.endeMitgliedschaft?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restMitgliedszeitraumFrontendDo: RestMitgliedszeitraumFrontendDo): IMitgliedszeitraumFrontendDo {
    return {
      ...restMitgliedszeitraumFrontendDo,
      startMitgliedschaft: restMitgliedszeitraumFrontendDo.startMitgliedschaft
        ? dayjs(restMitgliedszeitraumFrontendDo.startMitgliedschaft)
        : undefined,
      endeMitgliedschaft: restMitgliedszeitraumFrontendDo.endeMitgliedschaft
        ? dayjs(restMitgliedszeitraumFrontendDo.endeMitgliedschaft)
        : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMitgliedszeitraumFrontendDo>): HttpResponse<IMitgliedszeitraumFrontendDo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestMitgliedszeitraumFrontendDo[]>,
  ): HttpResponse<IMitgliedszeitraumFrontendDo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
