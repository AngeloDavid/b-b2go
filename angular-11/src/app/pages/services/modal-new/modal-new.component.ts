import { Component, OnInit, Inject } from '@angular/core';
import { category } from '../../../interfaces/interfaces';
import { CategoriesService } from '../../../services/categories.service';
import { ServicesService } from '../../../services/services.service';
import {  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar,MatSnackBarModule, MatSnackBarConfig } from '@angular/material/snack-bar';
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
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)  public data: any
  ) { 
 
    if( data != null) {
      console.log(data);
      this.isnew= data.isnew;      
      this.ServiceService.getCategory(data.id).subscribe(
      resp=>{
        
        this.categoria = resp.data() as category;     
        this.categoria.id_catFather= data.id_catFather;
        this.categoria.id=data.id;
      }      
    );
      // this.categoria= data.data;
     
    }
    //lista de categorias 
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
      id_catFather: this.ServiceService.firebase.doc('categories/'+this.categoria.id_catFather).ref,
    };

    
    if(this.isnew ){      
      cat.date_created=new Date();
      console.log(cat);
      this.ServiceService.createCategory(cat).then( resp=>{
        console.log('Guardado Correcto');
        this.nullCategoryPr();
        this.openSnackBar('Servicio Creado','Dance');
      }, err=>{
        console.error('problemas',err);
      });
    }else{    
      cat.date_created=this.categoria.date_created;
      cat.date_modified = new Date();
      console.log("categoria"); 
      console.log(cat);
      this.ServiceService.updateCategory(this.categoria.id, cat).then(resp=> {
        console.log('Modifciacion Correcto');
        this.nullCategoryPr();
        this.openSnackBar('Servicio Modificada con exito','Undo');
      }, err=>{console.error(err)})
    }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
