import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../../interfaces/Category';
import { Product } from '../../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  servidor = 'https://ecommerce-api-develop.herokuapp.com';
  products:Product[] = [];
  search_products:Product[] = [];
  categories:Category[] = [];
  category_id:string = "";
  name:string = "";
  url_image:string = "";
  product_id:string = "";

  constructor(private http: HttpClient) { }

  getCategories() {
    if (this.categories.length === 0) {
      this.http.get(`${this.servidor}/api/categories`).subscribe(
        (resp:any) => {
          for (let i = 0; i < resp['categories'].length; i++) {
            let category:Category = {
              category_id: resp['categories'][i]['category_id'],
              name: resp['categories'][i]['name'],
              url_image: resp['categories'][i]['url_image']
            }
            this.categories.push(category);
          }
        },
        (err) => console.log(err)
      );
    }
  }

  getProducts(id:string) {
    if (this.products.length === 0) {
      this.http.get(`${this.servidor}/api/products/by-category/${id}`).subscribe(
        (resp:any) => {
          for (let i = 0; i < resp['products'].length; i++) {
            let product:Product = {
              product_id: resp['products'][i]['product_id'],
              category_id: resp['products'][i]['category_id'],
              brand_id: resp['products'][i]['brand_id'],
              title: resp['products'][i]['title'],
              price: resp['products'][i]['price'],
              stock: resp['products'][i]['stock'],
              description: resp['products'][i]['description'],
              url_image: resp['products'][i]['url_image'],
              average_score: resp['products'][i]['average_score']
            }
            this.products.push(product);
          }
        },
        (err) => console.log(err)
      );
    }
  }

  searchProducts(search_string:string) {
    if (this.search_products.length === 0) {
      this.http.get(`${this.servidor}/api/products/by-filter/${search_string}`).subscribe(
        (resp:any) => {
          for (let i = 0; i < resp['products'].length; i++) {
            let product:Product = {
              product_id: resp['products'][i]['product_id'],
              category_id: resp['products'][i]['category_id'],
              brand_id: resp['products'][i]['brand_id'],
              title: resp['products'][i]['title'],
              price: resp['products'][i]['price'],
              stock: resp['products'][i]['stock'],
              description: resp['products'][i]['description'],
              url_image: resp['products'][i]['url_image'],
              average_score: resp['products'][i]['average_score']
            }
            this.search_products.push(product);
          }
        },
        (err) => console.log(err)
      );
    }
  }
  
}
