import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user :User= {
    email:"",
    password:"",
    emailVerified:false
  }

  constructor(
    private authService: AuthService
  ) {   }


  ngOnInit(): void {
  }

  login(){
    console.log(this.user);
    this.authService.SignIn(this.user.email, this.user.password as string);
  }

}
