import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';
import { UserReport } from '../../../interfaces/UserReport';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  users:UserReport[] = [];

  constructor(public service: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.service.users = [];
    let token = sessionStorage.getItem('adminToken');
    if(!token) {
      this.router.navigate([`/admin-panel`]);
    }
    else {
      this.service.getUsers(token);
      this.users = this.service.users;
    }
    console.log(this.users);
  }

  toAdminPanel() {
    this.router.navigate([`/admin-panel`]);
  }

}
