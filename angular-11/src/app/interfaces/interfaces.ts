export interface category {
    id?: string;
    name: string;
    note:string;
    order: number;
    img?: string;
    status: boolean;
    isFather: boolean;
    id_Cat_p?:string;
    date_created?:Date;
  }