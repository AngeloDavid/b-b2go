import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {category } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(public firebase: AngularFirestore) { }

  getAllCategories(){
    return this.firebase.collection('categories', ref => ref.where('isFather','==',false).orderBy('date_created')).snapshotChanges();
  }

  getAllServicesFather(id:any){ 
    const refservice = this.firebase.doc('categories/'+id).ref;
   return  this.firebase.collection('categories', ref => ref.where('id_catFather','==',refservice).where('status','==',true).orderBy('order')).snapshotChanges();
 }

 getAllServicesbyname(id:any,name:string){ 
  const refservice = this.firebase.doc('categories/'+id).ref;
 return  this.firebase.collection('categories', ref => ref.where('id_catFather','==',refservice).where('name','==',name).orderBy('order')).snapshotChanges();
}

  getCategory(id:any){
    return this.firebase.collection('categories').doc(id).get();
  }
  createCategory(categoria:category){
    return this.firebase.collection('categories').add(categoria);
  }

  updateCategory(id:any,categoria:category){
    // console.log(id,categoria);
    return this.firebase.collection('categories').doc(id).update(categoria);
  }

  // unsubscribeCategory(id:any, statusd:boolean){
  //   return this.firebase.collection('categories').doc(id).set({status: statusd}, {merge: true});
  // }
  getTest(){
    console.log ("service");
    let query = this.firebase.collection('categories').get();
    let listService: any = [];
    query.subscribe(res => {
      res.forEach(doc => {
        let newService :any = doc.data();
        newService.id=doc.id;
        // newService.name= doc.data().name;

        if(  newService.id_catFather){
          newService.id_catFather.get().then((resp : any) =>{
            newService.Categoryname = resp.data().name;
            newService.Categoryid = resp.id;
            listService.push(newService); 
          }).catch(
            (err: any)=>{
              console.error(err);
            }
          );
        }else{
          listService.push(newService); 
        }
        
      });
    });

    console.log(" test");
    console.log(listService);
  } 
}
