import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from '../../interfaces/Order';
import { Rate } from '../../interfaces/Rate';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  servidor = 'https://ecommerce-api-develop.herokuapp.com';
  orders:Order[] = [];
  ordersMap = new Map<string, Order[]>();


  constructor(private http: HttpClient, private router: Router) { }

  getOrders(token:string) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.get(`${this.servidor}/api/order`, { headers: headers }).subscribe(
      (resp:any) => {
        for (let i = 0; i < resp['orders'].length; i++) {
          let order:Order = {
            product_id: resp['orders'][i].product_id,
            order_id: resp['orders'][i].order_id,
            title: resp['orders'][i].title,
            price: resp['orders'][i].price,
            url_image: resp['orders'][i].url_image,
            quantity: resp['orders'][i].quantity,
            rated: resp['orders'][i].rated,
            create_at: resp['orders'][i].create_at,
            orders_total_price: resp['orders'][i].orders_total_price
          }
          this.orders.push(order);
          let ordersArray = this.ordersMap.get(order.order_id);
          if(ordersArray) {
            ordersArray.push(order);
            this.ordersMap.set(order.order_id, ordersArray);
          }
          else {
            this.ordersMap.set(order.order_id, this.orders);
            this.orders = [];
          }
        }
      },
      (err) => console.log(err)
    );
  }

  generateOrder(token:string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(`${this.servidor}/api/order`, null, { headers: headers }).subscribe(
      (resp:any) => {
        this.router.navigate([`/orders`]).then(() => {
          window.location.reload();
        });
        console.log(resp)
      },
      (err:any) => console.log(err)
    );
  }

  rateProduct(product_id:string, order_id:string, token:string, rate:Rate) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.put(`${this.servidor}/api/order/${product_id}/${order_id}`, {"score": rate.score, "comment": rate.comment}, { headers: headers }).subscribe(
      (resp:any) =>{
        this.router.navigate([`/products/${product_id}`]).then(() => {
          window.location.reload();
        });
        console.log(resp)
      } ,
      (err:any) => console.log(err)
    );
  }

}
