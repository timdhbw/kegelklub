import dayjs from 'dayjs/esm';

import { IBildFrontendDo, NewBildFrontendDo } from './bild-frontend-do.model';

export const sampleWithRequiredData: IBildFrontendDo = {
  id: 15698,
  erstellung: dayjs('2025-01-22T18:06'),
  bild: '../fake-data/blob/hipster.png',
  bildContentType: 'unknown',
};

export const sampleWithPartialData: IBildFrontendDo = {
  id: 9458,
  typ: 'though Urknall indignieren',
  erstellung: dayjs('2025-01-22T17:29'),
  bild: '../fake-data/blob/hipster.png',
  bildContentType: 'unknown',
};

export const sampleWithFullData: IBildFrontendDo = {
  id: 18430,
  bildbeschreibung: 'drechseln',
  typ: 'entsprechend',
  erstellung: dayjs('2025-01-22T14:42'),
  bild: '../fake-data/blob/hipster.png',
  bildContentType: 'unknown',
};

export const sampleWithNewData: NewBildFrontendDo = {
  erstellung: dayjs('2025-01-22T15:39'),
  bild: '../fake-data/blob/hipster.png',
  bildContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
