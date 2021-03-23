import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {User } from '../../interfaces/interfaces';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  newUser: User={
    name:'',
    lastname:'',
    phone:'',
    email:'',
    emailVerified:false,
    password:'',
    type:2,
    iscompleted:false,
  };
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register(){
    console.log(this.newUser);
    this.authService.SignUp(this.newUser);
  }

}
