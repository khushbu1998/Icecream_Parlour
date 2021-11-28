import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/product';
import { Products } from 'src/app/product copy';
import { CartService } from 'src/app/services/cart.service';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products: Products[]=[];
  product: Products = new Products();
 
  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe(() => {
    this.handleProductDetails();
    })
  }

  handleProductDetails() {

    const theProductId: number = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(theProductId).subscribe(
      data => {
        console.log(data);
        this.product = data;
  
      }
    )

    console.log(this.product);


  }

  addToCart(){
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem)
  }

}
