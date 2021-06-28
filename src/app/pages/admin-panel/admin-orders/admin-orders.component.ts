import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';
import { OrderReport } from '../../../interfaces/OrderReport';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders:OrderReport[] = [];

  constructor(public service: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.service.orders = [];
    let token = sessionStorage.getItem('adminToken');
    if(!token) {
      this.router.navigate([`/admin-panel`]);
    }
    else {
      this.service.getOrders(token);
      this.orders = this.service.orders;
      console.log(this.orders);
    }
  }

  toAdminPanel() {
    this.router.navigate([`/admin-panel`]);
  }

}
