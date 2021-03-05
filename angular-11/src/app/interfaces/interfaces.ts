export interface category {
    id?: string;
    name: string;
    note:string;
    order: number;
    img?: string;
    status: boolean;
    isFather: boolean;
    id_catFather?:any;
    date_created?:Date;
    catName?:string;
  }