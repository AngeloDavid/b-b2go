import { Component, OnInit, Inject } from '@angular/core';
import { service,category,worker} from '../../../../interfaces/interfaces';
import {  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WorkerServiceService} from '../../../../services/worker-service.service';
import { CategoriesService } from '../../../../services/categories.service';
import { ServicesService } from '../../../../services/services.service';

@Component({
  selector: 'app-service-worker',
  templateUrl: './service-worker.component.html',
  styleUrls: ['./service-worker.component.css']
})
export class ServiceWorkerComponent implements OnInit {

  isNew:boolean = true;
  isEditable:boolean=false;
  isOK:boolean=false;
  service: service  = {
    id: '',
    order:0,
    price:0,
    isIva:false,
    ivaIncluded:false,
    time: new Date("02:00"),
    status:true,
    note:'',
    id_ServCat:'',
    timestring:''
  }           

  
  itemsCategory: category [] =[];
  itemsServices: category [] =[];

  id_Worker : string ='';

  constructor(
    private WorkerService: WorkerServiceService,
    private CategoryService :CategoriesService,
    private ServiceService: ServicesService,
    @Inject(MAT_DIALOG_DATA)  public data: any
  ) { 
    
    this.CategoryService.getCategoriesEnable().subscribe(
      resp=>{
        this.itemsCategory =resp.map( (e: any)=>{
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data().name,
            note:e.payload.doc.data().note,
            order:e.payload.doc.data().order,
            img:e.payload.doc.data().img,
            status:e.payload.doc.data().status,
            isFather:e.payload.doc.data().isFather
          }
        } );
      }, 
      err=>{
        console.error(err);
      }
    );
    // console.log(this.itemsCategory);
    if( data != null) {
      // console.log(data.id);
      this.id_Worker= data.idWorker;
      this.isNew= data.isnew;    
      if(!this.isNew){
        this.isEditable= true;
        this.WorkerService.getServiceWorker(data.id).subscribe(
          resp=>{      
            let timedata = resp.data() as any;      
            this.service = resp.data() as service;             
            this.service.id=data.id;
            this.service.id_ServCat= data.id_ServCat;
            this.service.id_cat = data.id_cat;
            this.service.timestring =(timedata.time.toDate().getHours()< 10 ? "0" : "")+ timedata.time.toDate().getHours() + ':'+ (timedata.time.toDate().getMinutes()< 10 ? "0" : "" )+timedata.time.toDate().getMinutes() ;            
            
            // console.log(this.service.time.getTime());
            this.selectCat();
          }          
          );
      }        
    }
  }

  ngOnInit(): void {
  }

  guardar(){
    console.log(this.service);

    
    let servi: service  = {      
      order:this.service.order,
      price:this.service.price,
      isIva:this.service.isIva,
      ivaIncluded: this.service.isIva? this.service.ivaIncluded: false,
      time: new Date("2021-01-01T"+this.service.timestring+":00-05:00"),
      status:this.service.status,      
      note:this.service.note,
      id_cat: this.ServiceService.firebase.doc('categories/'+this.service.id_cat).ref,      
      id_worker : this.ServiceService.firebase.doc('workers/'+this.id_Worker).ref,      
    }   
    
    if(this.isNew){
      servi.date_created = new Date();      
      this.WorkerService.createServiceWorker(servi).then( reps=>{
        console.log('Save ok');
        this.isOK= true;
      },err =>{
        console.error(err);
      })
    }else{
      servi.date_created =this.service.date_created;
      servi.date_modified = new Date();
      // console.log(servi);
      this.WorkerService.updateServiceWorker(this.service.id as string,servi).then( resp=>{
        console.log('modify ok');
        this.isOK= true;
      }, err =>{
        console.error(err);
      } ); 
    }

    
  }
  editar(){
    this.isEditable =! this.isEditable;
  }

  newService(){
    this.isNew=true;
    this.isEditable= false;
    this.service = {
      id: '',
      order:0,
      price:0,
      isIva:false,
      ivaIncluded:false,
      time: new Date("00:00"),
      status:true,
      note:'',
      id_ServCat:''
    }   
  }
  selectCat(){
    this.ServiceService.getAllServicesFather(this.service.id_ServCat).subscribe(
      resp=>{
        this.itemsServices =resp.map( (e: any)=>{
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data().name,
            note:e.payload.doc.data().note,
            order:e.payload.doc.data().order,
            img:e.payload.doc.data().img,
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
}
