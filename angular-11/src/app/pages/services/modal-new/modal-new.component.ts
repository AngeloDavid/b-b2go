import { Component, OnInit, Inject } from '@angular/core';
import { category } from '../../../interfaces/interfaces';
import { CategoriesService } from '../../../services/categories.service';
import { ServicesService } from '../../../services/services.service';
import {  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { isNull } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-modal-new',
  templateUrl: './modal-new.component.html',
  styleUrls: ['./modal-new.component.css']
})
export class ModalNewComponent implements OnInit {

  categoria:category={
    id:'',
    name:'',
    note:'',
    order:0,
    img:'',
    status:true,
    isFather:false,
    id_catFather:''
  }
  
  isnew:boolean = true;

  itemsCategory: category [] =[];

  constructor(
    private CategoryService :CategoriesService,
    private ServiceService: ServicesService,
    @Inject(MAT_DIALOG_DATA)  public data: any
  ) { 
 
    if( data != null) {
      this.isnew= data.isnew;
      this.categoria= data.data;
      console.log(data);
    }

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
  }

  ngOnInit(): void {
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
      isFather:false,
      id_catFather:''
    }
  }

  guardar(){
    console.log(this.categoria );

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
      console.log(cat);
      this.ServiceService.createCategory(cat).then( resp=>{
        console.log('Guardado Correcto');
        this.nullCategoryPr();
        // this.openSnackBar('Categoria Creada','Dance');
      }, err=>{
        console.error('problemas',err);
      });
    }else{    
      console.log(""); 
      // this.ServiceService.updateCategory(this.categoria.id, cat).then(resp=> {
      //   console.log('Modifciacion Correcto');
      //   this.nullCategoryPr();
      //   // this.openSnackBar('Categoria Modificada con exito','Undo');
      // }, err=>{console.error(err)})
    }

  }

}
