import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/services/worker.service';
import {category,worker } from '../../../interfaces/interfaces';
import { CategoriesService } from '../../../services/categories.service';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  activityData: any=[];
  Categories: category [] = [];
  worker: worker ={
    id:'',
    ced:'',
    name:'',
    lastname:'',
    businessName:'',
    email:'',
    phone1:'',
    address:'',
    status:1,
    catName:'',
    skill:'',
    experience:'',
    id_category:''
  }
  isNew:boolean=true;
  isEditable:boolean=false;

  constructor(
      private CateService: CategoriesService,
      private WorkerService: WorkerService
  ) {
    this.CateService.getCategoriesEnable().subscribe (
      resp=>{
        this.Categories = resp.map( (e: any)=>{
            return {
              id: e.payload.doc.id,
              name:e.payload.doc.data().name,
              note:e.payload.doc.data().note,
              order:e.payload.doc.data().order,
              status:e.payload.doc.data().status,
              isFather:e.payload.doc.data().isFather            
            }
        } );
      },
      err=>{
        console.error(err);
      }
    );
   }

  ngOnInit(): void {
  }

  guardar(){

    //console.log(this.worker);

    let wor: worker ={
      name:this.worker.name,
      lastname:this.worker.lastname,
      businessName:this.worker.businessName,
      ced:this.worker.ced,
      email: this.worker.email,
      phone1:this.worker.phone1,
      address: this.worker.address,
      status: this.worker.status,
      skill: this.worker.skill,
      experience: this.worker.experience,
      id_category: this.CateService.firebase.doc('categories/'+this.worker.id_category).ref,
    }

    if(this.isNew){
      wor.date_created= new Date();
      console.log(wor);
      this.WorkerService.createWorker(wor).then( 
        resp=>{
          console.log('Guardado Correcto');
        }, 
        err=>{
          console.log(err)
      } );
    }
  }

}
