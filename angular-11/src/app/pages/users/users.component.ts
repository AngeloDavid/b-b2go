import { Component, OnInit } from '@angular/core';
import {User } from '../../interfaces/interfaces';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'phone','status','act'];
  items: User []=[];

  constructor(
    private authservice:AuthService
  ) {
    this.authservice.getAllUsers().subscribe((result)=>{
      this.items = result.map( (e:any)=>{
        return e.payload.doc.data();
      })

    });

   }
  

  ngOnInit(): void {
  }

}
