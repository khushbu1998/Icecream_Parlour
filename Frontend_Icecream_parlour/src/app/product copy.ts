export class Products {
    id = 0;
    name = '';
   
    unitPrice: number;
    imageUrl = '';
    active: boolean;
    unitsInStock: number;
    dateCreated: Date = new Date();  ;
    lastUpdated: Date = new Date();  ;
    description = '';
    constructor(){
        this.unitPrice= 0.0;
        this.active = false;
        this.unitsInStock = 0;
    }
    
}
