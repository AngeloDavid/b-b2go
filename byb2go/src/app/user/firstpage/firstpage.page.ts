import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.page.html',
  styleUrls: ['./firstpage.page.scss'],
})
export class FirstpagePage implements OnInit {

  constructor(private navCtrl: NavController, public router: Router) {
    // console.log("hola")
    // if( localStorage.getItem('user') != ''){
      
    //   this.router.navigate(['home']);
    //   console.log("hola")
    // }

   }

  ngOnInit() {
  }

  inciarsesion(){
    
  }
}
