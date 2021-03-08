import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { worker } from 'src/app/interfaces/interfaces';
import { WorkerService } from 'src/app/services/worker.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'


@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements AfterViewInit {

  items : any =[];

  displayedColumns: string[] = ['id', 'ced', 'name', 'email','phone','address','category','status','act'];
  dataSource = new MatTableDataSource<worker>(this.items);
  @ViewChild(MatPaginator)set appprueba(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  } ;

  constructor(
    private workerServices: WorkerService
  ){ 
    this.workerServices.getAllWorkers().subscribe(
      resp=>{
        this.items= resp.map((e:any) =>{
          const data = e.payload.doc.data() as worker;
          let itemWork: worker = {
            id: e.payload.doc.id,
            ced:data.ced,
            name: data.name,
            lastname: data.lastname,
            businessName:data.businessName,
            email:data.email,
            phone1: data.phone1	,
            address: data.address,
            date_created: data.date_created,
            status: data.status
          };
          if(data.id_category){
            data.id_category.get().then((resp : any)=>{
              itemWork.id_category=resp.id;
              itemWork.catName=resp.data().name;
            }).catch(
              (err: any)=>{
                console.error(err);
              }
            );
          }
          // console.log(data);

          return itemWork;
        } );
        this.dataSource.data= this.items;
        // console.log(this.items);
      },
      err =>{
        console.error(err);
      }
    );
  

  }

  ngAfterViewInit(): void {
    
  }
  modifyCategory(element: any){

  }

  

}
