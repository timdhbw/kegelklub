import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBildFrontendDo, NewBildFrontendDo } from '../bild-frontend-do.model';

export type PartialUpdateBildFrontendDo = Partial<IBildFrontendDo> & Pick<IBildFrontendDo, 'id'>;

type RestOf<T extends IBildFrontendDo | NewBildFrontendDo> = Omit<T, 'erstellung'> & {
  erstellung?: string | null;
};

export type RestBildFrontendDo = RestOf<IBildFrontendDo>;

export type NewRestBildFrontendDo = RestOf<NewBildFrontendDo>;

export type PartialUpdateRestBildFrontendDo = RestOf<PartialUpdateBildFrontendDo>;

export type EntityResponseType = HttpResponse<IBildFrontendDo>;
export type EntityArrayResponseType = HttpResponse<IBildFrontendDo[]>;

@Injectable({ providedIn: 'root' })
export class BildFrontendDoService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/bilds');

  create(bild: NewBildFrontendDo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bild);
    return this.http
      .post<RestBildFrontendDo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(bild: IBildFrontendDo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bild);
    return this.http
      .put<RestBildFrontendDo>(`${this.resourceUrl}/${this.getBildFrontendDoIdentifier(bild)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(bild: PartialUpdateBildFrontendDo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bild);
    return this.http
      .patch<RestBildFrontendDo>(`${this.resourceUrl}/${this.getBildFrontendDoIdentifier(bild)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestBildFrontendDo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestBildFrontendDo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBildFrontendDoIdentifier(bild: Pick<IBildFrontendDo, 'id'>): number {
    return bild.id;
  }

  compareBildFrontendDo(o1: Pick<IBildFrontendDo, 'id'> | null, o2: Pick<IBildFrontendDo, 'id'> | null): boolean {
    return o1 && o2 ? this.getBildFrontendDoIdentifier(o1) === this.getBildFrontendDoIdentifier(o2) : o1 === o2;
  }

  addBildFrontendDoToCollectionIfMissing<Type extends Pick<IBildFrontendDo, 'id'>>(
    bildCollection: Type[],
    ...bildsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const bilds: Type[] = bildsToCheck.filter(isPresent);
    if (bilds.length > 0) {
      const bildCollectionIdentifiers = bildCollection.map(bildItem => this.getBildFrontendDoIdentifier(bildItem));
      const bildsToAdd = bilds.filter(bildItem => {
        const bildIdentifier = this.getBildFrontendDoIdentifier(bildItem);
        if (bildCollectionIdentifiers.includes(bildIdentifier)) {
          return false;
        }
        bildCollectionIdentifiers.push(bildIdentifier);
        return true;
      });
      return [...bildsToAdd, ...bildCollection];
    }
    return bildCollection;
  }

  protected convertDateFromClient<T extends IBildFrontendDo | NewBildFrontendDo | PartialUpdateBildFrontendDo>(bild: T): RestOf<T> {
    return {
      ...bild,
      erstellung: bild.erstellung?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restBildFrontendDo: RestBildFrontendDo): IBildFrontendDo {
    return {
      ...restBildFrontendDo,
      erstellung: restBildFrontendDo.erstellung ? dayjs(restBildFrontendDo.erstellung) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestBildFrontendDo>): HttpResponse<IBildFrontendDo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestBildFrontendDo[]>): HttpResponse<IBildFrontendDo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
