
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../common/cart-item';
import { Product } from '../product';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCateogryId : number;
  
  currentCategoryName: string | null;

  searchMode : boolean;
  
  constructor(private productService: ProductService, 
    private cartService: CartService,
    private route: ActivatedRoute) {
      this.currentCateogryId=0;
      this.currentCategoryName="undefined";
      this.searchMode=false;
     
     }

  ngOnInit(){
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(){

    this.searchMode= this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
    this.handleListProduct();
    }
    
  }

  handleListProduct(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      this.currentCateogryId = Number(this.route.snapshot.paramMap.get('id'));
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
     
    }
    else{
      this.currentCateogryId=1;
      this.currentCategoryName = 'Dollies';
    }

    console.log(this.currentCategoryName);

    this.productService.getProductList(this.currentCateogryId).subscribe(
      data => {
       this.products= data;
      }
    )
  }

  handleSearchProducts(){
    const theKeyword: string | null = this.route.snapshot.paramMap.get('keyword');
    this.currentCategoryName= theKeyword;
    this.productService.searchProducts(theKeyword).subscribe(
      data =>{
        this.products= data;
      }
    );
    console.log(this.products);
  }


  addToCart(theProduct: Product){
    console.log(`Adding to cart:  ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }


}
