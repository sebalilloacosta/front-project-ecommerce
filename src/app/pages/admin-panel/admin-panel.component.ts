import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    let token = sessionStorage.getItem('adminToken');
    if (!token) {
      this.router.navigate([`/admin-panel/login`]);
    }
  }

  ordersReport(){
    this.router.navigate([`/admin-panel/orders`]);
  }

  usersReport(){
    this.router.navigate([`/admin-panel/users`]);
  }

  logOutAdmin(){
    sessionStorage.removeItem('adminToken');
    this.router.navigate([`/home`]).then(() => {
      window.location.reload();
    });
  }

}
