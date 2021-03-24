import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user:User;
  constructor(private navCtrl: NavController) {
    this.user=JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit() {
  }

  backPages(){       
    this.navCtrl.back();
  }

}
