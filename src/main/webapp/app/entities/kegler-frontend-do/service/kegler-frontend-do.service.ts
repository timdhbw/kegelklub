import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IKeglerFrontendDo, NewKeglerFrontendDo } from '../kegler-frontend-do.model';

export type PartialUpdateKeglerFrontendDo = Partial<IKeglerFrontendDo> & Pick<IKeglerFrontendDo, 'id'>;

export type EntityResponseType = HttpResponse<IKeglerFrontendDo>;
export type EntityArrayResponseType = HttpResponse<IKeglerFrontendDo[]>;

@Injectable({ providedIn: 'root' })
export class KeglerFrontendDoService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/keglers');

  create(kegler: NewKeglerFrontendDo): Observable<EntityResponseType> {
    return this.http.post<IKeglerFrontendDo>(this.resourceUrl, kegler, { observe: 'response' });
  }

  update(kegler: IKeglerFrontendDo): Observable<EntityResponseType> {
    return this.http.put<IKeglerFrontendDo>(`${this.resourceUrl}/${this.getKeglerFrontendDoIdentifier(kegler)}`, kegler, {
      observe: 'response',
    });
  }

  partialUpdate(kegler: PartialUpdateKeglerFrontendDo): Observable<EntityResponseType> {
    return this.http.patch<IKeglerFrontendDo>(`${this.resourceUrl}/${this.getKeglerFrontendDoIdentifier(kegler)}`, kegler, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKeglerFrontendDo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKeglerFrontendDo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getKeglerFrontendDoIdentifier(kegler: Pick<IKeglerFrontendDo, 'id'>): number {
    return kegler.id;
  }

  compareKeglerFrontendDo(o1: Pick<IKeglerFrontendDo, 'id'> | null, o2: Pick<IKeglerFrontendDo, 'id'> | null): boolean {
    return o1 && o2 ? this.getKeglerFrontendDoIdentifier(o1) === this.getKeglerFrontendDoIdentifier(o2) : o1 === o2;
  }

  addKeglerFrontendDoToCollectionIfMissing<Type extends Pick<IKeglerFrontendDo, 'id'>>(
    keglerCollection: Type[],
    ...keglersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const keglers: Type[] = keglersToCheck.filter(isPresent);
    if (keglers.length > 0) {
      const keglerCollectionIdentifiers = keglerCollection.map(keglerItem => this.getKeglerFrontendDoIdentifier(keglerItem));
      const keglersToAdd = keglers.filter(keglerItem => {
        const keglerIdentifier = this.getKeglerFrontendDoIdentifier(keglerItem);
        if (keglerCollectionIdentifiers.includes(keglerIdentifier)) {
          return false;
        }
        keglerCollectionIdentifiers.push(keglerIdentifier);
        return true;
      });
      return [...keglersToAdd, ...keglerCollection];
    }
    return keglerCollection;
  }
}
