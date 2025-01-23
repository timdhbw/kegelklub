import dayjs from 'dayjs/esm';
import { IKegelclubtreffenFrontendDo } from 'app/entities/kegelclubtreffen-frontend-do/kegelclubtreffen-frontend-do.model';

export interface IBildFrontendDo {
  id: number;
  bildbeschreibung?: string | null;
  typ?: string | null;
  erstellung?: dayjs.Dayjs | null;
  bild?: string | null;
  bildContentType?: string | null;
  treffen?: IKegelclubtreffenFrontendDo | null;
}

export type NewBildFrontendDo = Omit<IBildFrontendDo, 'id'> & { id: null };
