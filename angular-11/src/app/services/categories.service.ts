import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {category } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(public firebase: AngularFirestore) { }

  // Reportes
  getAllCategories(){
    return this.firebase.collection('categories', ref => ref.where('isFather','==',true)).snapshotChanges();
  }

  getCategoriesEnable(){
    return this.firebase.collection('categories', ref => ref.where('isFather','==',true).where('status','==',true)).snapshotChanges();
  }

  getCategory(id:any){
    return this.firebase.collection('categories').doc(id).get();
  }
  createCategory(categoria:category){
    return this.firebase.collection('categories').add(categoria);
  }

  updateCategory(id:any,categoria:category){
    console.log(id,categoria);
    return this.firebase.collection('categories').doc(id).update(categoria);
  }

  // unsubscribeCategory(id:any, statusd:boolean){
  //   return this.firebase.collection('categories').doc(id).set({status: statusd});
  // } 

}
