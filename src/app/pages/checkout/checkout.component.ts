import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from '../../interfaces/CartProduct';
import { OrdersService } from '../../services/orders/orders.service';
import { CartsService } from '../../services/carts/carts.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  orderProducts:CartProduct[] = this.serviceCart.products;

  constructor(private router: Router, public service: OrdersService, public serviceCart: CartsService, public serviceUser: UsersService) {
    
   }

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    if (token) {
      if (this.serviceCart.products.length == 0) {
        this.router.navigate([`/cart`]);
      }
    }
    else{
      this.router.navigate([`/home`]);
    }
  }

  toProfile() {
    this.router.navigate([`/profile`]);
  }

  newOrder() {
    let token = localStorage.getItem('accessToken');
    if (token) {
      this.service.generateOrder(token);
    }
  }

}
