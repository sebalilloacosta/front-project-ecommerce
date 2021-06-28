import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Admin } from '../../interfaces/Admin';
import { OrderReport } from '../../interfaces/OrderReport';
import { UserReport } from '../../interfaces/UserReport';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  servidor = 'https://ecommerce-api-develop.herokuapp.com';
  orders:OrderReport[] = [];
  users:UserReport[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  logAdmin(admin:Admin) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.servidor}/api/authentication/admin-panel/login`, admin).subscribe(
      (resp:any) => {
        sessionStorage.setItem('adminToken', resp['access-token']);
          this.router.navigate([`/admin-panel`]).then(() => {
            window.location.reload();
          });
        let userToken = localStorage.getItem('accessToken');
        if(userToken) {
          localStorage.removeItem('accessToken');
        }
        console.log("Sesion iniciada con exito");
        console.log(resp);
      },
      (err:any) => {
        alert("Datos de inicio de sesion invalidos");
        console.log(err.error.error.message);
      }
      
    );
  }

  getOrders(token:string) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': token
    });
    this.http.get(`${this.servidor}/api/admin-panel/orders`, { headers: headers}).subscribe(
      (resp:any) => {
        for (let i = 0; i < resp['orders'].length; i++) {
          let order:OrderReport = {
            order_id: resp['orders'][i].order_id,
            user_id: resp['orders'][i].user_id,
            firstname: resp['orders'][i].firstname,
            lastname: resp['orders'][i].lastname,
            email: resp['orders'][i].email,
            product_id: resp['orders'][i].product_id,
            title: resp['orders'][i].title,
            quantity: resp['orders'][i].quantity,
            total_price: resp['orders'][i].total_price,
            create_at: resp['orders'][i].create_at,
          }
          this.orders.push(order);
        }
      },
      (err) => console.log(err)
    );
  }

  getUsers(token:string) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': token
    });
    this.http.get(`${this.servidor}/api/admin-panel/users`, { headers: headers}).subscribe(
      (resp:any) => {
        for (let i = 0; i < resp['users'].length; i++) {
          let user:UserReport = {
            user_id: resp['users'][i].user_id,
            firstname: resp['users'][i].firstname,
            lastname: resp['users'][i].lastname,
            id_card: resp['users'][i].id_card,
            email: resp['users'][i].email,
            residence_address: resp['users'][i].residence_address,
            region: resp['users'][i].region,
            commune: resp['users'][i].commune
          }
          this.users.push(user)
        }
      },
      (err) => console.log(err)
    );
  }

}
