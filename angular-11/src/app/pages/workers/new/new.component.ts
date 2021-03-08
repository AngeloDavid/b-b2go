import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerService } from 'src/app/services/worker.service';
import {category,worker } from '../../../interfaces/interfaces';
import { CategoriesService } from '../../../services/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      private WorkerService: WorkerService,
      private route: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar
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
    const routerParams= this.route.snapshot.paramMap;
    const idWorker = String(routerParams.get('idWorker'));
    if(idWorker != "null"){
      this.isNew=false;
      this.isEditable= true;
      this.WorkerService.getWorker(idWorker).subscribe(
        resp=>{
          const data = resp.data() as worker;
          this.worker= data;
          this.worker.id=resp.id;        
          data.id_category.get().then( (resp: any)=>{
            this.worker.catName = resp.data().name;
            this.worker.id_category=resp.id;
          })
          // console.log(this.worker)        ;
        }, 
        err=>{
          console.log(err);
        });
    }else{
      this.newWorker();
    }    
    
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
      
      this.WorkerService.createWorker(wor).then( 
        (resp: any)=>{
          this.openSnackBar('Guardado Correcto','Undo');
          this.newWorker();
          this.router.navigate(['profesionales'])   
        }, 
        err=>{
          console.log(err)
      } );
    }else{
      wor.date_modified = new Date();
      wor.date_created =this.worker.date_created;
      // console.log(wor);
      this.WorkerService.updateWorker(this.worker.id,wor).then(resp=>{
        this.openSnackBar('Modificado Correcto','Undo');
        this.router.navigate(['profesionales']) 
        this.isEditable=true;
        this.isNew=false;
      },err=>{
        console.log(err)
      });
    }
  }

  newWorker(){
    this.router.navigate(['profesionales-new']);
    this.isNew=true;
    this.isEditable= false;
    this.worker ={
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
  }

  editar(){
    this.isEditable =! this.isEditable;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
