import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
// angular modulo
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatSnackBar,MatSnackBarModule, MatSnackBarConfig } from '@angular/material/snack-bar';
import {category} from '../../interfaces/interfaces';

import {CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})


export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'note', 'order','status','act'];

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
  
  isnew:boolean = true;
  
  items: any ;

  // @ViewChild(MatSort)
  // set appSort(sort: MatSort){
  //   this.items.
  // }
   ;

  constructor( 
    public snackBar: MatSnackBar,
    private categoriesService: CategoriesService) {
      this.categoriesService.getAllCategories().subscribe(
        resp =>{
          this.items = resp.map((e:any)=>{
            return{
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
        },
        err => {
          console.log(err);
        }
      );
   }

  ngOnInit(): void {
  }

  guardar(){
    var cat: category = {
      name: this.categoria.name,
      note: this.categoria.note,
      order: this.categoria.order,
      status: this.categoria.status,
      isFather: this.categoria.isFather,
      date_created:new Date()
    };
    if(this.isnew ){
      this.categoria.date_created= new Date();
      this.categoriesService.createCategory(cat).then( resp=>{
        console.log('Guardado Correcto');
        this.nullCategoryPr();
        this.openSnackBar('Categoria Creada','Dance');
      }, err=>{
        console.error('problemas',err);
      });
    }else{     
      this.categoriesService.updateCategory(this.categoria.id, cat).then(resp=> {
        console.log('Modifciacion Correcto');
        this.nullCategoryPr();
        this.openSnackBar('Categoria Modificada con exito','Undo');
      }, err=>{console.error(err)})
    }
    

  }


  getCategory(idCate: any){
    console.log(idCate);
    this.categoriesService.getCategory(idCate).subscribe (
      resp=>{
        var dato: any=resp.data();
        this.categoria = {          
          id: idCate,
          name : dato.name,
          note: dato.note,
          order:dato.order,
          img:dato.img,
          status:dato.status,
          isFather:dato.isFather
        }
        this.isnew= false;
        // console.log(dato);
      },
      err =>{
        console.error(err);
      }
    )
    // console.log(idCate);
  }

  nullCategoryPr(){
    this.isnew = true;
    this.categoria = {
      id:'',
      name:'',
      note:'',
      order:0,
      img:'',
      status:true,
      isFather:true,
      id_catFather:''
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
}