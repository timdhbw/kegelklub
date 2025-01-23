import { IKeglerFrontendDo, NewKeglerFrontendDo } from './kegler-frontend-do.model';

export const sampleWithRequiredData: IKeglerFrontendDo = {
  id: 31073,
  name: 'realistisch',
};

export const sampleWithPartialData: IKeglerFrontendDo = {
  id: 30364,
  name: 'whenever beeidigen aufhellen',
};

export const sampleWithFullData: IKeglerFrontendDo = {
  id: 12597,
  name: 'ew harmonisch',
};

export const sampleWithNewData: NewKeglerFrontendDo = {
  name: 'Parkhaus',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
