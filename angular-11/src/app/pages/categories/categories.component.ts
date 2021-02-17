import { Component, OnInit } from '@angular/core';
// angular modulo
import { AngularFirestore } from '@angular/fire/firestore';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';

import {category} from '../../interfaces/interfaces';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})


export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'note', 'order','status','img'];

  categoria:category={
    id:'',
    name:'',
    note:'',
    order:0,
    img:'',
    status:true,
    isFather:true,
    id_Cat_p:''
  }
  
  items : Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('categories').valueChanges();
   }

  ngOnInit(): void {
  }

  guardar(){
    console.log("holaa");
    console.log(this.categoria);
  }

}
