import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { service} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WorkerServiceService {

  constructor(
    public firebase: AngularFirestore
  ) { }

  getServiceWorker(id:string){
    return this.firebase.collection('services', ref => ref.where('id_worker','==',id)).snapshotChanges();
  }


}
