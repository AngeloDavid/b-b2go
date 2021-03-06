import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationExtras  } from '@angular/router';
import { NavController } from '@ionic/angular';
import { WorkerService} from '../services/worker.service';
import { worker,service} from '../interfaces/interfaces';
import { WorkerServiceService } from '../services/worker-service.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.page.html',
  styleUrls: ['./worker.page.scss'],
})
export class WorkerPage implements OnInit {

  worker:worker;
  shop ={
    subtotal:0,
    iva:0,
    total:0,
    seconds:0,  
    servicios:[],
    worker: null
  };
  servicios: service []=[];
  serviciosSelected: any []=[];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private WorkerService:WorkerService,
    private wsservice:WorkerServiceService
  ) { 
    const id_worker = this.activatedRoute.snapshot.paramMap.get('id');
    const idser = this.activatedRoute.snapshot.paramMap.get('idser');
    this.WorkerService.getWorker(id_worker).subscribe((resp)=>{
      this.worker= resp.data() as worker;
      this.worker.id=resp.id;
    });

    this.wsservice.getAllServicesWorker(id_worker).subscribe((resp)=>{
      this.servicios= resp.map((e: any)=>{
        let data = e.payload.doc.data() as service;
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
        service.selected=  service.id== idser?true:false; 
        service.cant=  service.id== idser?1:0;       
        
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
        return service;
      })
      this.sumTotal();
    },(err)=>{
      console.error(err);
    })
  }

  ngOnInit() {
  }

  addCant(index,option){
    if(!(this.servicios[index].cant<=0 && option)){
      this.servicios[index].cant= option?this.servicios[index].cant-1:this.servicios[index].cant+1;
      this.servicios[index].selected=true;
      
    }
    if(this.servicios[index].cant<=0 ){
      this.servicios[index].selected=false;
      this.shop.subtotal=0;
      this.shop.iva=0;
      this.shop.total=0;
    } 
    this.sumTotal();   
  }

  sumTotal(){
    this.serviciosSelected=[];
    this.shop={
      subtotal:0,
      iva:0,
      total:0,
      seconds:0,  
      servicios:[],
      worker: this.worker 
    }    
    let fecha = new Date();
    fecha.setHours(0);
    fecha.setMinutes(0);
    fecha.setSeconds(0);
    fecha.setMilliseconds(0);
    let selectedServicio: any [] =[];

    this.servicios.map((e : any)=>{      
      if(e.selected){
        this.shop.subtotal = this.shop.subtotal + (e.price*e.cant);
        this.shop.iva=this.shop.iva + (e.iva*e.cant);
        this.shop.total = this.shop.total +  (e.total*e.cant);
        console.log(fecha);
        this.shop.seconds = this.shop.seconds + ((e.time.toDate().getHours() * 60*60) + ( e.time.toDate().getMinutes() * 60))*e.cant;
        this.shop.servicios.push(e);
       // this.serviciosSelected.push(e);
        // fecha.setSeconds(fecha.getSeconds()+segundos);
        // console.log(e.time.toDate().getHours(), e.time.toDate().getMinutes(), segundos, segundos * e.cant,fecha);
      }
    })
    this.shop
    console.log(this.shop);
  }


  backPages(){    
    this.shop.subtotal=0;
    this.shop.iva=0;
    this.shop.total=0;
    this.shop.seconds=0;
    this.shop.servicios=[];
    this.navCtrl.back();
  }

  openOrder(){
    console.log("abrir",this.serviciosSelected,this.shop);
    let navigationExtras: NavigationExtras = {
      queryParams: {          
          shops: JSON.stringify(this.shop)
      }
    };
    this.navCtrl.navigateForward(['order'],navigationExtras);
  }
}
