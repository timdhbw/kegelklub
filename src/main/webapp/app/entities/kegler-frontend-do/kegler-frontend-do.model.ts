export interface IKeglerFrontendDo {
  id: number;
  name?: string | null;
}

export type NewKeglerFrontendDo = Omit<IKeglerFrontendDo, 'id'> & { id: null };
