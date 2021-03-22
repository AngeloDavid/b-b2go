import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ServicesService} from '../services/services.service';
import {category} from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  servicios: category [] = [];

  constructor(
      private activatedRoute: ActivatedRoute,
      private ServiciosService: ServicesService,
      private navCtrl: NavController
    ) { 
        this.ServiciosService.getAllServicesFather("MPnO9hxHZcWA87uaJzn6").subscribe(
          (result)=>{
            this.servicios = result.map((e: any)=>{
              return {
                id: e.payload.doc.id,
                name: e.payload.doc.data().name,
                note:e.payload.doc.data().note,
                order:e.payload.doc.data().order,
                img:e.payload.doc.data().img,
                status:e.payload.doc.data().status,
                isFather:e.payload.doc.data().isFather,
                id_Cat_p:e.payload.doc.data().id_Cat_p
              }
            });
          }
        );

     }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  openService(id:string){
    console.log(id);
    this.navCtrl.navigateForward(['servicio',id]);
  }

}
