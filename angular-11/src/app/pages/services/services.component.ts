import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit,ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {category} from '../../interfaces/interfaces';

import { ServicesService} from '../../services/services.service';

import {ModalNewComponent} from '../services/modal-new/modal-new.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements AfterViewInit {
  
  items:any= [];

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
      this.ServiceServi.getAllCategories().subscribe(
        resp=>{
          this.items = resp.map((e: any)=>{
            console.log(e.payload.doc.data().id_catFather);
            return {
              id: e.payload.doc.id,
              name: e.payload.doc.data().name,
              note:e.payload.doc.data().note,
              order:e.payload.doc.data().order,
              img:e.payload.doc.data().img,
              status:e.payload.doc.data().status,
              isFather:e.payload.doc.data().isFather,
              id_catFather:e.payload.doc.data().id_catFather
            }
          });
          this.dataSource.data = this.items;
        },
        err => {
          console.error(err);
        }
      );
     
   }

  ngAfterViewInit(){
  // ngOnInit(): void {
    console.log("hola after");
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

