import dayjs from 'dayjs/esm';
import { IKeglerFrontendDo } from 'app/entities/kegler-frontend-do/kegler-frontend-do.model';

export interface IMitgliedszeitraumFrontendDo {
  id: number;
  startMitgliedschaft?: dayjs.Dayjs | null;
  endeMitgliedschaft?: dayjs.Dayjs | null;
  kegler?: IKeglerFrontendDo | null;
}

export type NewMitgliedszeitraumFrontendDo = Omit<IMitgliedszeitraumFrontendDo, 'id'> & { id: null };
