import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWurfErgebnisFrontendDo, NewWurfErgebnisFrontendDo } from '../wurf-ergebnis-frontend-do.model';

export type PartialUpdateWurfErgebnisFrontendDo = Partial<IWurfErgebnisFrontendDo> & Pick<IWurfErgebnisFrontendDo, 'id'>;

export type EntityResponseType = HttpResponse<IWurfErgebnisFrontendDo>;
export type EntityArrayResponseType = HttpResponse<IWurfErgebnisFrontendDo[]>;

@Injectable({ providedIn: 'root' })
export class WurfErgebnisFrontendDoService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/wurf-ergebnis');

  create(wurfErgebnis: NewWurfErgebnisFrontendDo): Observable<EntityResponseType> {
    return this.http.post<IWurfErgebnisFrontendDo>(this.resourceUrl, wurfErgebnis, { observe: 'response' });
  }

  update(wurfErgebnis: IWurfErgebnisFrontendDo): Observable<EntityResponseType> {
    return this.http.put<IWurfErgebnisFrontendDo>(
      `${this.resourceUrl}/${this.getWurfErgebnisFrontendDoIdentifier(wurfErgebnis)}`,
      wurfErgebnis,
      { observe: 'response' },
    );
  }

  partialUpdate(wurfErgebnis: PartialUpdateWurfErgebnisFrontendDo): Observable<EntityResponseType> {
    return this.http.patch<IWurfErgebnisFrontendDo>(
      `${this.resourceUrl}/${this.getWurfErgebnisFrontendDoIdentifier(wurfErgebnis)}`,
      wurfErgebnis,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWurfErgebnisFrontendDo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWurfErgebnisFrontendDo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getWurfErgebnisFrontendDoIdentifier(wurfErgebnis: Pick<IWurfErgebnisFrontendDo, 'id'>): number {
    return wurfErgebnis.id;
  }

  compareWurfErgebnisFrontendDo(o1: Pick<IWurfErgebnisFrontendDo, 'id'> | null, o2: Pick<IWurfErgebnisFrontendDo, 'id'> | null): boolean {
    return o1 && o2 ? this.getWurfErgebnisFrontendDoIdentifier(o1) === this.getWurfErgebnisFrontendDoIdentifier(o2) : o1 === o2;
  }

  addWurfErgebnisFrontendDoToCollectionIfMissing<Type extends Pick<IWurfErgebnisFrontendDo, 'id'>>(
    wurfErgebnisCollection: Type[],
    ...wurfErgebnisToCheck: (Type | null | undefined)[]
  ): Type[] {
    const wurfErgebnis: Type[] = wurfErgebnisToCheck.filter(isPresent);
    if (wurfErgebnis.length > 0) {
      const wurfErgebnisCollectionIdentifiers = wurfErgebnisCollection.map(wurfErgebnisItem =>
        this.getWurfErgebnisFrontendDoIdentifier(wurfErgebnisItem),
      );
      const wurfErgebnisToAdd = wurfErgebnis.filter(wurfErgebnisItem => {
        const wurfErgebnisIdentifier = this.getWurfErgebnisFrontendDoIdentifier(wurfErgebnisItem);
        if (wurfErgebnisCollectionIdentifiers.includes(wurfErgebnisIdentifier)) {
          return false;
        }
        wurfErgebnisCollectionIdentifiers.push(wurfErgebnisIdentifier);
        return true;
      });
      return [...wurfErgebnisToAdd, ...wurfErgebnisCollection];
    }
    return wurfErgebnisCollection;
  }
}
