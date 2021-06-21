import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from '../../interfaces/Cart';
import { CartProduct } from '../../interfaces/CartProduct';

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
  token = localStorage.getItem('accessToken');

  constructor(private http: HttpClient) { }

  getCart(token:string) {

  }
}
