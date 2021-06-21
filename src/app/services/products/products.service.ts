import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  servidor = 'https://ecommerce-api-develop.herokuapp.com';
  product_id:string = "";
  category_id:string = "";
  brand_id:string = "";
  title:string = "";
  price:string = "";
  stock:string = "";
  description:string = "";
  url_image:string = "";
  average_score:string = "";
  products:Product[] = [];
    
  constructor(private http: HttpClient) { }

  getProductData(id:string) {
    if (this.products.length === 0) {
      this.http.get(`${this.servidor}/api/products/${id}`).subscribe(
        (resp:any) => {
          let newProduct:Product = {
              product_id: resp['product'][0]['product_id'],
              category_id: resp['product'][0]['category_id'],
              brand_id: resp['product'][0]['brand_id'],
              title: resp['product'][0]['title'],
              price: resp['product'][0]['price'],
              stock: resp['product'][0]['stock'],
              description: resp['product'][0]['description'],
              url_image: resp['product'][0]['url_image'],
              average_score: resp['product'][0]['average_score']
            }
            this.products.push(newProduct);

          console.log("Producto cargado con exito");
        },
        (err) => console.log(err)
      );
    }
  }

}
