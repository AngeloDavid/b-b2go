import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { WorkerServiceService } from '../services/worker-service.service';
import { service} from '../interfaces/interfaces';
@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  servicios: service[]=[];
  title:string;
  constructor( 
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private workService: WorkerServiceService ) {
      var idService = this.activatedRoute.snapshot.paramMap.get('id');
      this.workService.getAllServicesCat(idService).subscribe(
        (resp: any)=>{
         this.servicios = resp.map(
            (e: any)=>{
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
              if(data.id_cat){
                data.id_cat.get().then((resp:any)=>{
                  service.id_cat= resp.id;
                  service.serName= resp.data().name;
                  this.title=resp.data().name
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
              if(data.id_worker){
                data.id_worker.get().then((resp:any)=>{
                  service.id_worker= resp.id;
                  service.worker= resp.data();                  
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
              console.log(service);
              return service;
            }
          );
          console.log(resp);
        }
      );
     }

  ngOnInit() {
  
  }

  backPages(){
    this.navCtrl.back();
  }

  openWorker(id:string,idser:string){
    console.log('openworker',id,idser);
    this.navCtrl.navigateForward(['trabajador',id,idser])
  }

}
