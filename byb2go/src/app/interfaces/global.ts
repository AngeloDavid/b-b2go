export class globalSettings {
    iva:number=12;

    public calcularIVA (isIva,ivaIncluded, price) {
        let service: any;
        if (isIva){
            if(ivaIncluded){
              service.iva = ( service.price - (price / ((100+this.iva)/100)));
              service.price = service.price - service.iva;                  
            }else{
              service.iva = (service.price * (this.iva/100)); 
            }
          }else{
            service.iva = 0;
          }
          service.total = service.price + service.iva;
        return service;
    }
}