import dayjs from 'dayjs/esm';

export interface IKegelclubtreffenFrontendDo {
  id: number;
  zeitpunkt?: dayjs.Dayjs | null;
  dauer?: number | null;
  treffpunkt?: string | null;
}

export type NewKegelclubtreffenFrontendDo = Omit<IKegelclubtreffenFrontendDo, 'id'> & { id: null };
