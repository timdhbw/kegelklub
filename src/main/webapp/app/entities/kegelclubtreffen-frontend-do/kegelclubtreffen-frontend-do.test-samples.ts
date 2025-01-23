import dayjs from 'dayjs/esm';

import { IKegelclubtreffenFrontendDo, NewKegelclubtreffenFrontendDo } from './kegelclubtreffen-frontend-do.model';

export const sampleWithRequiredData: IKegelclubtreffenFrontendDo = {
  id: 22044,
  zeitpunkt: dayjs('2025-01-23T05:05'),
  treffpunkt: 'gen entgegen',
};

export const sampleWithPartialData: IKegelclubtreffenFrontendDo = {
  id: 31278,
  zeitpunkt: dayjs('2025-01-22T19:25'),
  treffpunkt: 'bezüglich andante Regen',
};

export const sampleWithFullData: IKegelclubtreffenFrontendDo = {
  id: 5847,
  zeitpunkt: dayjs('2025-01-23T11:31'),
  dauer: 30537,
  treffpunkt: 'Landwirtschaft Innenarchitektur',
};

export const sampleWithNewData: NewKegelclubtreffenFrontendDo = {
  zeitpunkt: dayjs('2025-01-23T01:19'),
  treffpunkt: 'and',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
