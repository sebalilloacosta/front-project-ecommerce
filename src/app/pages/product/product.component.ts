import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/Product';
import { ProductsService } from '../../services/products/products.service';
import { CartsService } from '../../services/carts/carts.service';
import { OrdersService } from '../../services/orders/orders.service';
import { Comment } from '../../interfaces/Rate';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products:Product[] = [];
  stockError:string = "";
  comments:Comment[] = [];

  constructor(
    public serviceCart:CartsService, 
    public serviceProduct:ProductsService, 
    public serviceOrder:OrdersService, 
    private router: Router, 
    private ActiveRoute:ActivatedRoute)
  {}

  ngOnInit(): void {
    this.serviceProduct.products = [];
    this.serviceProduct.comments = [];
    this.ActiveRoute.paramMap.subscribe( (paramMap:any) =>{
      const {params} = paramMap;
      this.serviceProduct.getProductData(params['product']);
    });
    this.comments = this.serviceProduct.comments;
    this.products = this.serviceProduct.products;
  }

  
  addToCart(id:string, stock:string) {
    let token = localStorage.getItem('accessToken');
    if (token) {
      alert("Producto fue agregado al carrito")
      this.serviceProduct.addProduct(id, token); 
    }
    else {
      alert("Inicie sesión para agregar al carrito");
      console.log("Sesión inválida");
    }
  }

}
