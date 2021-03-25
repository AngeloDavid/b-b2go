import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {category } from '../interfaces/interfaces';
import { AngularFireStorage} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  collection ="categories";
  constructor(public firebase: AngularFirestore,
    private storage: AngularFireStorage) { }

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

  
  setService(id:any,campo:any){
    return this.firebase.collection(this.collection).doc(id).set( campo, {merge:true});
  }

  uploadServ(file: any, id:String){
    var path_splitted = file.name.split('.');
    const filepath = '/'+this.collection+'/'+id+'.'+path_splitted.pop();
    const storageref = this.storage.ref(filepath);
    const uploadTask =  this.storage.upload(filepath,file);
    return uploadTask;

  }


}
