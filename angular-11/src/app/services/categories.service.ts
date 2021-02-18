import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {category } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firebase: AngularFirestore) { }

  getAllCategories(){
    return this.firebase.collection('categories', ref => ref.where('isFather','==',true)).snapshotChanges();
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

  unsubscribeCategory(id:any, statusd:boolean){
    return this.firebase.collection('categories').doc(id).set({status: statusd});
  } 

}
