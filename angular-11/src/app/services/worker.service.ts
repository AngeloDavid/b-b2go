import { Injectable } from '@angular/core';
import {worker } from '../interfaces/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor( private firebase: AngularFirestore) { }

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
}
