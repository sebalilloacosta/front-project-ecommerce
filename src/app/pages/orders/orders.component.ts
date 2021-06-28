import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders/orders.service';
import { Order } from '../../interfaces/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders:Order[] = [];
  ordersMap = new Map<string, Order[]>();

  constructor(public service: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this.service.ordersMap.clear();
    let token = localStorage.getItem('accessToken');
    if (token) {
      this.service.getOrders(token);
      this.ordersMap = this.service.ordersMap;
;    }
    else {
      this.router.navigate([`/home`]);
    }
  }

  commentBox(product_id:string, order_id:string){
    let token = localStorage.getItem('accessToken');
    if(token) {
      this.router.navigate([`/rate/${order_id}/${product_id}`]);
    }
    else{
      this.router.navigate([`/home`]);
    }
  }

}
