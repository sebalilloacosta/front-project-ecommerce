import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from '../../interfaces/CartProduct';
import { CartsService } from '../../services/carts/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts:CartProduct[] = [];

  constructor(public service:CartsService, private router: Router) { }

  ngOnInit(): void {
    this.service.totalPrice = 0;
    this.service.products = [];
    let token = localStorage.getItem('accessToken');
    if (token) {
      this.service.getCart(token);
      this.cartProducts = this.service.products;
    }
  }

  valuechange(newValue:number, id:string) {
    let mymodel:number = newValue;
    let token = localStorage.getItem('accessToken');
    if (token) {
      this.service.changeQuantity(id, mymodel, token);
    }
  }

  toProduct(id:string) {
    this.router.navigate([`/products/${id}`]);
  }

  toCheckout() {
    this.router.navigate([`/checkout`]);
  }
  
  deleteFromCart(id:string){
    let token = localStorage.getItem('accessToken');
    if (token == null) {
      token = null;
    }
    else {
        this.service.deleteProduct(id, token);
    }
  }

}
