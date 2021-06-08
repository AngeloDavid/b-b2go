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
    selected?:boolean;
    cant?:number;
}

export interface User {
    uid?: string;
    email: string;
    password?:string;
    displayName?: string;
    lastname?:string;
    name?:string;
    photoURL?: string;
    date_brith?:Date;
    phone?:string;
    emailVerified: boolean;
    type?:number;
    iscompleted?:boolean;
 }

 export interface reseva {
    id?:string;
    num?:number;
    isBooking:boolean;
    date_start:Date;
    date_end:Date;
    address:string;
    id_worker?:any;
    id_user?:any;
    date_created:Date;
    date_modified:Date;
    status:number;
    horas:string;
    subtotal:number;
    iva:number;
    total:number;
 }
 

 export interface payment{
     id?:string;
     desp:string;
     order:number;
     status:boolean;
     id_payment?:any;
     icon?:string;
     payment?:string;
     isdefault?:boolean;
     data_payment?:any;

 }

 export interface users_payments{
     id?:string;
     desp?:string;
     id_user:any;
     id_payment:any;
     isdefault:boolean;
     status:boolean;
     data_payment?:any;
 }