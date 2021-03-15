import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user :User= {
    email:"",
    password:"",
    emailVerified:false
  }
  
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  }

  signup(){
    console.log(this.user);
    this.authService.SignUp(this.user.email,this.user.password as string).then(
      ()=>{
        console.log("registro existoso")
      }
    );

  }

}
