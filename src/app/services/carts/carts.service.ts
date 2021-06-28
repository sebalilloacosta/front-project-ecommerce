import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CartProduct } from '../../interfaces/CartProduct';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartsService {


  servidor = 'https://ecommerce-api-develop.herokuapp.com';
  products:CartProduct[] = [];
  product_id:string = "";
  cart_id:string = "";
  quantity:number = 0;
  brand_id:string = "";
  category_id:string = "";
  title:string = "";
  price:number = 0;
  stock:number = 0;
  description:string = "";
  url_image:string = "";
  average_score:string = "";
  totalPrice:number = 0;

  constructor(private http: HttpClient, private router: Router) { }
  
  getCart(token:string) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.get(`${this.servidor}/api/shopping-cart`, { headers: headers }).subscribe(
      (resp:any) => {
        for (let i = 0; i < resp['products'].length; i++) {
          let product:CartProduct = {
            product_id: resp['products'][i]['product_id'],
            cart_id: resp['products'][i]['cart_id'],
            quantity: resp['products'][i]['quantity'],
            brand_id: resp['products'][i]['brand_id'],
            category_id: resp['products'][i]['category_id'],
            title: resp['products'][i]['title'],
            price: resp['products'][i]['price'],
            stock: resp['products'][i]['stock'],
            description: resp['products'][i]['description'],
            url_image: resp['products'][i]['url_image'],
            average_score: resp['products'][i]['average_score'],
            sub_total: resp['products'][i]['price'] * resp['products'][i]['quantity']
          }
          this.totalPrice = this.totalPrice + (product.price * product.quantity);
          this.products.push(product);
        }
      },
      (err) => console.log(err)
    );
  }

  deleteProduct(id:string, token:string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    this.http.delete(`${this.servidor}/api/shopping-cart/${id}`, { headers: headers }).subscribe(
      (resp:any) => {
        this.router.navigate([`/cart`]).then(() => {
          window.location.reload();
        });
        console.log(resp)
      },
      (err:any) => console.log(err)
    );
  }

  changeQuantity(id:string, quantity:number, token:string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    this.http.put(`${this.servidor}/api/shopping-cart/${id}`, { "quantity": quantity }, { headers: headers }).subscribe(
      (resp:any) => {
        this.router.navigate([`/cart`]).then(() => {
          window.location.reload();
        });
        console.log(resp)
      },
      (err:any) => console.log(err)
    );

  }

}
