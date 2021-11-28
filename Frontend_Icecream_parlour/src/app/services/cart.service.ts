import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] =[]
  
  totalPrice : Subject<number> =new Subject<number>();
  totalQuantity : Subject<number> =new Subject<number>();


  constructor() { }

  addToCart(theCartItem: CartItem){
    let alreadExistsInCart: boolean= false;
    let existingCartItem: CartItem | undefined;
    if(this.cartItems.length>0){
       existingCartItem= this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id );
       
       alreadExistsInCart = (existingCartItem!=undefined);

    }

    if(alreadExistsInCart){
      if(existingCartItem!==undefined){
        existingCartItem.quantity+=1;
      }
    }

    else{
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
 
  }


  computeCartTotals() {
   
    let totalPriceValue =0.0;
    let totalQuantityValue=0;
    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue,totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice =tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log("--------------");
  }
  
}
