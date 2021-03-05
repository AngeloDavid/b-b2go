import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit,ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {category} from '../../interfaces/interfaces';

import { ServicesService} from '../../services/services.service';

import {ModalNewComponent} from '../services/modal-new/modal-new.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements AfterViewInit {
  
  items:any= [];
  categoria:category={
    id:'',
    name:'',
    note:'',
    order:0,
    img:'',
    status:true,
    isFather:true,
    id_catFather:''
  }
  
  // cat : Observable <category> = null;

  displayedColumns: string[] = ['id', 'name', 'note', 'order','category','status','act'];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<category>(this.items);
  @ViewChild(MatPaginator)set appprueba(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  } ;
  constructor(
    private ServiceServi : ServicesService,
    public dialog: MatDialog
  ) {
    // this.ServiceServi.getTest();
      this.ServiceServi.getAllCategories().subscribe(
        resp=>{
          this.items = resp.map((e: any)=>{
            let data = e.payload.doc.data() as category; 
            let itemCat = {
              id: e.payload.doc.id,
              name: data.name,
              note:data.note,
              order:data.order,
              img:data.img,
              status:data.status,
              isFather:data.isFather,
              id_catFather:"",
              catName:""
            }

            if(data.id_catFather){
              data.id_catFather.get().then((resp : any)=>{
                itemCat.id_catFather=resp.id;
                itemCat.catName=resp.data().name;
              }).catch(
                (err: any)=>{
                  console.error(err);
                }
              );
            }

            return itemCat;
          });
          this.dataSource.data = this.items;
          // console.log(this.items);
        },
        err => {
          console.error(err);
        }
      );
     
   }

  ngAfterViewInit(){
  // ngOnInit(): void {
    // console.log("hola after");
    // this.dataSource.data = this.items;
  }
  
  getService(id:any){
    console.log(id);
  }

  createCategory() {
    const dialogRef = this.dialog.open(ModalNewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  modifyCategory(item: category){
    const diaconfig = new MatDialogConfig();
    diaconfig.data = {
        isnew:false,
        data: item
      };
    const dialogRef = this.dialog.open(ModalNewComponent,diaconfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}

