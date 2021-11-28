import { Product } from "../product";

export class CartItem {
 
    id :number;
    name : String;
    unitPrice :number;
    quantity :number;
    imageUrl : String;

    constructor(product: Product){
        this.id=product.id;
        this.name=product.name;
        this.unitPrice=product.unitPrice;
        this.quantity=1;
        this.imageUrl=product.imageUrl;        
    }
}

