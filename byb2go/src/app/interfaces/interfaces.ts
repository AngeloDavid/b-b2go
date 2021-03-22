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
    img?:string;
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

export interface service{
    id?:string;
    note?:string;
    order:number;
    price:number;
    isIva:boolean;
    ivaIncluded:boolean;
    time:Date;
    status:boolean;
    date_created?:Date;
    date_modified?:Date;
    id_cat?:any;
    id_worker?:any;
    id_ServCat?:any;
    catName?:string;
    serName?:string;
    iva?:number;
    total?:number;
    timestring?:string;
    worker?:worker;
}

export interface User {
    uid?: string;
    email: string;
    password?:string;
    displayName?: string;
    photoURL?: string;
    emailVerified: boolean;
 }