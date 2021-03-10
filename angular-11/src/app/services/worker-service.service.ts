import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { service, worker} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WorkerServiceService {

  constructor(
    public firebase: AngularFirestore
  ) { }

  getAllServicesWorker(id:any){ 
     const refservice = this.firebase.doc('workers/'+id).ref;
    return  this.firebase.collection('services', ref => ref.where('id_worker','==',refservice)).snapshotChanges();
  }

  getAll(servicio: worker){
    let servicios = this.firebase.collection('workers').doc('yadRtfPm3r2SB4DugfYG');
    console.log("servicios",servicios);

    const refservice = this.firebase.doc('workers/yadRtfPm3r2SB4DugfYG').ref;
    console.log("refer",refservice);
    console.log('servicio',servicio);
    this.firebase.collection('services').ref.where('id_worker','==',refservice).get().then((querySnapshot)=>{
      console.log(querySnapshot);
    })

  }
  
  getServiceWorker(id:string){ 
    return this.firebase.collection('services').doc(id).get();
  }
  
  createServiceWorker(serviceWork: service ){
    return this.firebase.collection('services').add(serviceWork);
  }

  updateServiceWorker(id:string, serviceWork: service){
    return this.firebase.collection('services').doc(id).update(serviceWork);
  }
  
  deleteServiceWork(id:string){
    return this.firebase.collection('service').doc(id).delete();
  }



}
