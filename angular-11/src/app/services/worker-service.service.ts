import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { service, worker} from '../interfaces/interfaces';
import { AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class WorkerServiceService {
  collection ="services";
  constructor(
    public firebase: AngularFirestore,
    private storage: AngularFireStorage
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
