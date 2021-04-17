import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import {users_payments } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    public firebase: AngularFirestore
  ) { }

  //todos los metodos de pago del usuario
  getAllPaymentsUser(id:string){
    const refservice = this.firebase.doc('users/'+id).ref;
    return  this.firebase.collection('users_payments', ref => ref.where('id_user','==',refservice).where('status','==',true).orderBy('date_created')).snapshotChanges();
  }

  getPaymentUser(id:string){
    return this.firebase.collection('users_payments').doc(id).get();
  }

  createServiceWorker(serviceWork: users_payments ){
    return this.firebase.collection('users_payments').add(serviceWork);
  }

  updateServiceWorker(id:string, serviceWork: users_payments){
    return this.firebase.collection('users_payments').doc(id).update(serviceWork);
  }



}
