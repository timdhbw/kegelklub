import { IKeglerFrontendDo } from 'app/entities/kegler-frontend-do/kegler-frontend-do.model';
import { IKegelclubtreffenFrontendDo } from 'app/entities/kegelclubtreffen-frontend-do/kegelclubtreffen-frontend-do.model';

export interface IWurfErgebnisFrontendDo {
  id: number;
  anzahlWuerfe?: number | null;
  gesamtpunktzahl?: number | null;
  pudel?: number | null;
  neuner?: number | null;
  kraenze?: number | null;
  kegler?: IKeglerFrontendDo | null;
  kegelclubtreffen?: IKegelclubtreffenFrontendDo | null;
}

export type NewWurfErgebnisFrontendDo = Omit<IWurfErgebnisFrontendDo, 'id'> & { id: null };
