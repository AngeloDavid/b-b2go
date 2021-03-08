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
    date_modified?:Date;
    catName?:string;
  }

export interface worker {
    id?: string;
    ced: string;
    name: string;
    lastname:string;
    businessName:string;
    email:string;
    phone1:string;
    phone2?:string;
    address:string;
    skill?:string;
    experience?:string;
    status:number;
    date_created?:Date;
    date_modified?:Date;
    // categoria
    catName?: string;
    id_category?:any;
}
