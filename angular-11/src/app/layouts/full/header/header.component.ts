import { Component } from '@angular/core';
import { AuthService} from '../../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(
    private authService: AuthService
  ) {   }

  logout(){
    console.log("cerrar secion")
    this.authService.SignOut();
  }
}
