import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../interfaces/Product';
import { Comment } from '../../interfaces/Rate';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  servidor = 'https://ecommerce-api-develop.herokuapp.com';
  product_id:string = "";
  category_id:string = "";
  brand_id:string = "";
  title:string = "";
  price:number = 0;
  stock:number = 0;
  description:string = "";
  url_image:string = "";
  average_score:number = 0;
  products:Product[] = [];
  comments:Comment[] = [];
    
  constructor(private http: HttpClient) { }
  
  getProductData(id:string) {
    if (this.products.length === 0) {
      this.http.get(`${this.servidor}/api/products/${id}`).subscribe(
        (resp:any) => {
          let newProduct:Product = {
              product_id: resp['product']['product_id'],
              category_id: resp['product']['category_id'],
              brand_id: resp['product']['brand_id'],
              title: resp['product']['title'],
              price: resp['product']['price'],
              stock: resp['product']['stock'],
              description: resp['product']['description'],
              url_image: resp['product']['url_image'],
              average_score: resp['product']['average_score']
          }
          for (let i = 0; i < resp['ratings'].length; i++) {
            let rate:Comment = {
              firstname: resp['ratings'][i]['firstname'],
              lastname: resp['ratings'][i]['lastname'],
              score: resp['ratings'][i]['score'],
              comment: resp['ratings'][i]['comment']
            }
            this.comments.push(rate);
          }
          this.products.push(newProduct);
        },
        (err) => console.log(err)
      );
    }
  }

  addProduct(id:string, token:string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    console.log(headers);
    this.http.post(`${this.servidor}/api/shopping-cart/${id}`, {"quantity": 1}, { headers: headers }).subscribe(
      (resp:any) => console.log(resp),
      (err:any) => console.log(err)
    );
  }

}
