import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular'
import { NewComponent } from './new/new.component';
import { PaymentService } from '../../services/payment.service';
import { payment } from '../../interfaces/interfaces';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  list:payment []=[];

  constructor(
    private navCtr: NavController,
    private modCtr: ModalController,
    private payServ: PaymentService
  ) { 
    this.payServ.getAllPaymentsUser('OHKAn4FZH0SKWaCvNTU2rI09svf2').subscribe(
      (resp)=>{
        this.list = resp.map(
          (e:any)=>{
            let data = e.payload.doc.data() as payment;
            let payment: payment ={
              id: e.payload.doc.id,
              order:data.order,
              desp:data.desp,
              status:data.status,
              isdefault: data.isdefault,
              data_payment:data.data_payment
            }
            if(data.id_payment){
              data.id_payment.get().then((resp:any)=>{
                payment.icon= resp.data().icon;
                payment.payment= resp.data().name;                
              }).catch(
                (err: any)=>{
                  console.error(err);
                }
              )
            }
            return payment;
          }
        );
        // console.log(this.list);
      }
    );
    
  }

  ngOnInit() {
  }

  backPages(){
    this.navCtr.back()
  }

  openNwPayment( ){
    this.navCtr.navigateForward(['payment/new'])
  }

  async presentModal() {
    const modal = await this.modCtr.create({
      component: NewComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modCtr.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }

}
