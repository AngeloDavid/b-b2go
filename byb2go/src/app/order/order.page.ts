import { Component, OnInit } from '@angular/core';
import { service, worker } from '../interfaces/interfaces';
import { ActivatedRoute } from "@angular/router";
import { PopoverController,NavController } from '@ionic/angular';
import { PaymentPoveerComponent } from './payment-poveer/payment-poveer.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  worker:worker;
  shop ={
    subtotal:0,
    iva:0,
    total:0,     
    seconds:0, 
    servicios:[],
    worker: null
  };
  servicios: service []=[];
  today = new Date();
  reserva = new Date(0);
  constructor(
    private route: ActivatedRoute,
    private popoverController: PopoverController,
    private navCtrl: NavController
  ) { 
    this.reserva.setHours(0);
    this.reserva.setMinutes(0);
    this.route.queryParams.subscribe(
      params=>{
        console.log(this.reserva);
        this.shop=JSON.parse( params["shops"]); 
        this.reserva.setSeconds(this.shop.seconds);
        console.log(this.shop, this.reserva);
      }
    );
    
  }

  ngOnInit() {
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PaymentPoveerComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  backPages(){
    this.navCtrl.back();
  }
;
}
