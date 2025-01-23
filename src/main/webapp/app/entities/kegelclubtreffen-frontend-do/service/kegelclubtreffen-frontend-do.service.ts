import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IKegelclubtreffenFrontendDo, NewKegelclubtreffenFrontendDo } from '../kegelclubtreffen-frontend-do.model';

export type PartialUpdateKegelclubtreffenFrontendDo = Partial<IKegelclubtreffenFrontendDo> & Pick<IKegelclubtreffenFrontendDo, 'id'>;

type RestOf<T extends IKegelclubtreffenFrontendDo | NewKegelclubtreffenFrontendDo> = Omit<T, 'zeitpunkt'> & {
  zeitpunkt?: string | null;
};

export type RestKegelclubtreffenFrontendDo = RestOf<IKegelclubtreffenFrontendDo>;

export type NewRestKegelclubtreffenFrontendDo = RestOf<NewKegelclubtreffenFrontendDo>;

export type PartialUpdateRestKegelclubtreffenFrontendDo = RestOf<PartialUpdateKegelclubtreffenFrontendDo>;

export type EntityResponseType = HttpResponse<IKegelclubtreffenFrontendDo>;
export type EntityArrayResponseType = HttpResponse<IKegelclubtreffenFrontendDo[]>;

@Injectable({ providedIn: 'root' })
export class KegelclubtreffenFrontendDoService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/kegelclubtreffens');

  create(kegelclubtreffen: NewKegelclubtreffenFrontendDo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(kegelclubtreffen);
    return this.http
      .post<RestKegelclubtreffenFrontendDo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(kegelclubtreffen: IKegelclubtreffenFrontendDo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(kegelclubtreffen);
    return this.http
      .put<RestKegelclubtreffenFrontendDo>(`${this.resourceUrl}/${this.getKegelclubtreffenFrontendDoIdentifier(kegelclubtreffen)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(kegelclubtreffen: PartialUpdateKegelclubtreffenFrontendDo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(kegelclubtreffen);
    return this.http
      .patch<RestKegelclubtreffenFrontendDo>(
        `${this.resourceUrl}/${this.getKegelclubtreffenFrontendDoIdentifier(kegelclubtreffen)}`,
        copy,
        { observe: 'response' },
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestKegelclubtreffenFrontendDo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestKegelclubtreffenFrontendDo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getKegelclubtreffenFrontendDoIdentifier(kegelclubtreffen: Pick<IKegelclubtreffenFrontendDo, 'id'>): number {
    return kegelclubtreffen.id;
  }

  compareKegelclubtreffenFrontendDo(
    o1: Pick<IKegelclubtreffenFrontendDo, 'id'> | null,
    o2: Pick<IKegelclubtreffenFrontendDo, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getKegelclubtreffenFrontendDoIdentifier(o1) === this.getKegelclubtreffenFrontendDoIdentifier(o2) : o1 === o2;
  }

  addKegelclubtreffenFrontendDoToCollectionIfMissing<Type extends Pick<IKegelclubtreffenFrontendDo, 'id'>>(
    kegelclubtreffenCollection: Type[],
    ...kegelclubtreffensToCheck: (Type | null | undefined)[]
  ): Type[] {
    const kegelclubtreffens: Type[] = kegelclubtreffensToCheck.filter(isPresent);
    if (kegelclubtreffens.length > 0) {
      const kegelclubtreffenCollectionIdentifiers = kegelclubtreffenCollection.map(kegelclubtreffenItem =>
        this.getKegelclubtreffenFrontendDoIdentifier(kegelclubtreffenItem),
      );
      const kegelclubtreffensToAdd = kegelclubtreffens.filter(kegelclubtreffenItem => {
        const kegelclubtreffenIdentifier = this.getKegelclubtreffenFrontendDoIdentifier(kegelclubtreffenItem);
        if (kegelclubtreffenCollectionIdentifiers.includes(kegelclubtreffenIdentifier)) {
          return false;
        }
        kegelclubtreffenCollectionIdentifiers.push(kegelclubtreffenIdentifier);
        return true;
      });
      return [...kegelclubtreffensToAdd, ...kegelclubtreffenCollection];
    }
    return kegelclubtreffenCollection;
  }

  protected convertDateFromClient<
    T extends IKegelclubtreffenFrontendDo | NewKegelclubtreffenFrontendDo | PartialUpdateKegelclubtreffenFrontendDo,
  >(kegelclubtreffen: T): RestOf<T> {
    return {
      ...kegelclubtreffen,
      zeitpunkt: kegelclubtreffen.zeitpunkt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restKegelclubtreffenFrontendDo: RestKegelclubtreffenFrontendDo): IKegelclubtreffenFrontendDo {
    return {
      ...restKegelclubtreffenFrontendDo,
      zeitpunkt: restKegelclubtreffenFrontendDo.zeitpunkt ? dayjs(restKegelclubtreffenFrontendDo.zeitpunkt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestKegelclubtreffenFrontendDo>): HttpResponse<IKegelclubtreffenFrontendDo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(
    res: HttpResponse<RestKegelclubtreffenFrontendDo[]>,
  ): HttpResponse<IKegelclubtreffenFrontendDo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
