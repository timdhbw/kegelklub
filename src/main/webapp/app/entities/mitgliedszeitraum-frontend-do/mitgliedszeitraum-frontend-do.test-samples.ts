import dayjs from 'dayjs/esm';

import { IMitgliedszeitraumFrontendDo, NewMitgliedszeitraumFrontendDo } from './mitgliedszeitraum-frontend-do.model';

export const sampleWithRequiredData: IMitgliedszeitraumFrontendDo = {
  id: 16083,
  startMitgliedschaft: dayjs('2025-01-23'),
};

export const sampleWithPartialData: IMitgliedszeitraumFrontendDo = {
  id: 22766,
  startMitgliedschaft: dayjs('2025-01-23'),
};

export const sampleWithFullData: IMitgliedszeitraumFrontendDo = {
  id: 23011,
  startMitgliedschaft: dayjs('2025-01-22'),
  endeMitgliedschaft: dayjs('2025-01-23'),
};

export const sampleWithNewData: NewMitgliedszeitraumFrontendDo = {
  startMitgliedschaft: dayjs('2025-01-23'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
