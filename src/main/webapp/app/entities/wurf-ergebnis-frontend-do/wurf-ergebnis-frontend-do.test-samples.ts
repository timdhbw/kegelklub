import { IWurfErgebnisFrontendDo, NewWurfErgebnisFrontendDo } from './wurf-ergebnis-frontend-do.model';

export const sampleWithRequiredData: IWurfErgebnisFrontendDo = {
  id: 4755,
  anzahlWuerfe: 26002,
  gesamtpunktzahl: 29874,
  pudel: 31416,
  neuner: 31024,
  kraenze: 8284,
};

export const sampleWithPartialData: IWurfErgebnisFrontendDo = {
  id: 635,
  anzahlWuerfe: 25244,
  gesamtpunktzahl: 13138,
  pudel: 2423,
  neuner: 22589,
  kraenze: 32472,
};

export const sampleWithFullData: IWurfErgebnisFrontendDo = {
  id: 21635,
  anzahlWuerfe: 10895,
  gesamtpunktzahl: 15606,
  pudel: 25593,
  neuner: 8842,
  kraenze: 16361,
};

export const sampleWithNewData: NewWurfErgebnisFrontendDo = {
  anzahlWuerfe: 32031,
  gesamtpunktzahl: 31004,
  pudel: 16177,
  neuner: 22393,
  kraenze: 20265,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
