import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular'
import { NewComponent } from './new/new.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(
    private navCtr: NavController,
    private modCtr: ModalController
  ) { }

  ngOnInit() {
  }

  backPages(){
    this.navCtr.back()
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
