import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  card: any ={
    nombre:'',
    numberCard:'',
    fecha:'',
    cvv:''
  }
  
  constructor(
    private modCtrl:ModalController
  ) { }

  ngOnInit() {}

  backPages(){
    this.modCtrl.dismiss({
      'dismissed': true
    });

  }

  save(){
    console.log(this.card);
  }

}
