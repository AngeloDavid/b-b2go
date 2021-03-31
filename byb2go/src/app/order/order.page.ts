import { Component, OnInit } from '@angular/core';
import { service, worker } from '../interfaces/interfaces';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  worker:worker;
  shop ={
    subtotal:0,
    iva:0,
    total:0
  };
  servicios: service []=[];
  
  constructor() { }

  ngOnInit() {
  }

}
