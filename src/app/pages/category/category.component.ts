import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/Product';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  products:Product[] = [];

  constructor(public serviceProduct:ProductsService, public service:CategoriesService, private router: Router, private ActiveRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.products = this.service.products;
    this.ActiveRoute.paramMap.subscribe( (paramMap:any) =>{
      const {params} = paramMap;
      this.service.getProducts(params['category_id']);
    });
  }

  getProductId(id:string) {
    this.serviceProduct.product_id = id;
    console.log('product id category: ',this.serviceProduct.product_id);
    this.router.navigate([`/products/${id}`]).then(() => {
      window.location.reload();
    });
  }

}
