import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {User } from '../../interfaces/interfaces';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:User={
    email:'',
    password:'',
    emailVerified:false
  }
  constructor(
    private authserv:AuthService
  ) { }

  ngOnInit() {
  }

  login(){
    console.log(this.user);
    this.authserv.SignIn(this.user.email,this.user.password);
  }
}
