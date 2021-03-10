import { Component, OnInit,ViewChild, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerService } from 'src/app/services/worker.service';
import { WorkerServiceService} from '../../../services/worker-service.service';
import {category,service,worker } from '../../../interfaces/interfaces';
import { CategoriesService } from '../../../services/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ServiceWorkerComponent } from './service-worker/service-worker.component';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent  implements AfterViewInit{

  activityData: any=[];
  Categories: category [] = [];
  Services:service []=[];
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

  displayedColumns: string[] = ['id', 'category','service','note', 'price', 'iva','total','time','status','act'];
  dataSource = new MatTableDataSource<service>(this.Services);

  @ViewChild(MatPaginator)set appprueba(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  } ;
  constructor(
      private CateService: CategoriesService,
      private WorkerService: WorkerService,
      private ServiWorkService: WorkerServiceService,
      private route: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar,
      public dialog: MatDialog
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
    const routerParams= this.route.snapshot.paramMap;
    const idWorker = String(routerParams.get('idWorker'));

    if(idWorker!= 'null'){
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
      }, 
      err=>{
        console.log(err);
      });
      
      this.ServiWorkService.getAllServicesWorker(idWorker).subscribe(
        resp=>{
          // console.log(resp);
          this.Services = resp.map( (e: any)=>{
            let data = e.payload.doc.data() as service;
            // console.log(data);
            let service: service  = {
              id: e.payload.doc.id,
              order:data.order,
              price:data.price,
              isIva:data.isIva,
              ivaIncluded:data.ivaIncluded,
              time: data.time,
              status:data.status,
              note:data.note
            }              
            if(data.id_cat){
              data.id_cat.get().then((resp:any)=>{
                service.id_cat= resp.id;
                service.serName= resp.data().name;
                resp.data().id_catFather.get().then( (resp1: any)=>{
                  service.catName = resp1.data().name; 
                  service.id_ServCat = resp1.id;                   
                });
              }).catch(
                (err: any)=>{
                  console.error(err);
                }
              )
            }  
            
            if (service.isIva){
              if(service.ivaIncluded){
                service.iva = ( service.price - (service.price / 1.12));
                service.price = service.price - service.iva;                  
              }else{
                service.iva = (service.price * 0.12); 
              }
            }else{
              service.iva = 0;
            }
            service.total = service.price + service.iva;
            
            // console.log(service);
            return service;
          })
          this.dataSource.data= this.Services;
        },err=>{})
    }
  
    
   }

   ngAfterViewInit(): void {
  
    
  }

  
  guardar(){
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

  createService(){
    const diaconfig = new MatDialogConfig();
    diaconfig.data = {
        isnew:true,        
        idWorker:this.worker.id
      };
    const dialogRef = this.dialog.open(ServiceWorkerComponent, diaconfig);

    dialogRef.afterClosed().subscribe(result => {     
      console.log(`Dialog result: ${result}`); 
      if(result)      
        this.openSnackBar('Servicio agregado correctamente','Undo')
    });
  }

  modifyService(Service: service){
    const diaconfig = new MatDialogConfig();
    diaconfig.data = {
        isnew:false,        
        idWorker:this.worker.id,
        id: Service.id,
        id_ServCat: Service.id_ServCat,
        id_cat: Service.id_cat
      };
    const dialogRef = this.dialog.open(ServiceWorkerComponent, diaconfig);

    dialogRef.afterClosed().subscribe(result => {      
      console.log(`Dialog result: ${result}`);
      if(result)      
        this.openSnackBar('Servicio modificado correctamente','Undo')
    });
  }

}
