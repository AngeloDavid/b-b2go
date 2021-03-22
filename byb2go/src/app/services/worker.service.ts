import { Injectable } from '@angular/core';
import {worker } from '../interfaces/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  collection ="workers";
  constructor( private firebase: AngularFirestore,
               private storage: AngularFireStorage) { }

  getAllWorkers(){
    return this.firebase.collection('workers').snapshotChanges();
  }

  getWorker(id:any){
    return this.firebase.collection('workers').doc(id).get();
  }

  createWorker(trabajador: worker){
    return this.firebase.collection('workers').add(trabajador);
  }

  updateWorker(id:any, trabajador: worker){
    return this.firebase.collection('workers').doc(id).update(trabajador);
  }

  setWorker(id:any,campo:any){
    return this.firebase.collection(this.collection).doc(id).set( campo, {merge:true});
  }

  uploadWorker(file: any, id:String){
    var path_splitted = file.name.split('.');
    const filepath = '/'+this.collection+'/'+id+'.'+path_splitted.pop();
    const storageref = this.storage.ref(filepath);
    const uploadTask =  this.storage.upload(filepath,file);
    return uploadTask;

  }

  
}
