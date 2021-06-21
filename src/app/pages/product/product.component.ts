import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/Product';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products:Product[] =[];

  constructor(public serviceProduct:ProductsService, private router: Router, private ActiveRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.products = this.serviceProduct.products;
    this.ActiveRoute.paramMap.subscribe( (paramMap:any) =>{
      const {params} = paramMap;
      this.serviceProduct.getProductData(params['product']);
    });
  }

}
