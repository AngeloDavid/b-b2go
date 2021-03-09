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

  isnew:boolean = true;
  service: service  = {
    id: '',
    order:0,
    price:0,
    isIva:false,
    ivaIncluded:false,
    time: new Date('01:00'),
    status:true,
    note:''
  }           

  itemsCategory: category [] =[];

  constructor(
    private WorkerService: WorkerServiceService,
    private CategoryService :CategoriesService,
    private ServiceService: ServicesService,
    @Inject(MAT_DIALOG_DATA)  public data: any
  ) { 
    if( data != null) {
      console.log(data);
      this.isnew= data.isnew;      
      this.ServiceService.getCategory(data.id).subscribe(
      resp=>{
        
        this.service = resp.data() as service;             
        this.service.id=data.id;
      }      
    );
    }
  }

  ngOnInit(): void {
  }

}
