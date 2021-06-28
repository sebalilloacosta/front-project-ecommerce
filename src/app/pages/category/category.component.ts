import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/Product';
import { ProductsService } from '../../services/products/products.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  products:Product[] = [];
  filteredProducts:Product[] = [];
  filtersForm:FormGroup;

  constructor(
    public fb:FormBuilder, 
    public serviceProduct:ProductsService, 
    public service:CategoriesService, 
    private router: Router, 
    private ActiveRoute:ActivatedRoute) {
      this.filtersForm = fb.group({
        ordenarPor:new FormControl(''),
        marca:new FormControl('')
      });
     }
  
  ngOnInit(): void {
    this.ActiveRoute.paramMap.subscribe( (paramMap:any) =>{
      this.products = this.service.products;
      const {params} = paramMap;
      this.service.getProducts(params['category_id']);
    });
  }

  getProductId(id:string) {
    this.serviceProduct.product_id = id;
    this.service.products = [];
    this.router.navigate([`/products/${id}`]);
  }

  onSubmit() {
    this.products = this.service.products;
    this.filteredProducts = [];
    let orderFilter = this.filtersForm.controls['ordenarPor'].value;
    let brandFilter = this.filtersForm.controls['marca'].value;

    if (brandFilter == "" && orderFilter == "") {
      this.filteredProducts = this.service.products;
    }
    else if (brandFilter != "" && orderFilter != "") {
      // FILTRO POR MARCA
      for (let i = 0; i < this.products.length; i++) {
        if(brandFilter == this.products[i].brand_id) {
          this.filteredProducts.push(this.products[i])
          // ORDENAMIENTO POR PRECIO
          if(orderFilter == "price_menor") {
            this.filteredProducts.sort((a:any, b:any) => a.price - b.price);
          }
          else if (orderFilter == "price_mayor") {
            this.filteredProducts.sort((a:any, b:any) => b.price - a.price);
          }
          // ORDENAMIENTO POR CALIFICACION
          else if (orderFilter == "rate_menor"){
            this.filteredProducts.sort((a:any, b:any) => a.average_score - b.average_score);
          }
          else if (orderFilter == "rate_mayor"){
            this.filteredProducts.sort((a:any, b:any) => b.average_score - a.average_score);
          }
        }
      }
    }
    else if (brandFilter != "" && orderFilter == ""){
      // FILTRO POR MARCA
      for (let i = 0; i < this.products.length; i++) {
        if(brandFilter == this.products[i].brand_id) {
          this.filteredProducts.push(this.products[i])
        }
      }
    }
    else if (brandFilter == "" && orderFilter != "") {
      this.filteredProducts = this.service.products;
      // ORDENAMIENTO POR PRECIO
      if(orderFilter == "price_menor") {
        this.filteredProducts.sort((a:any, b:any) => a.price - b.price);
      }
      else if (orderFilter == "price_mayor") {
        this.filteredProducts.sort((a:any, b:any) => b.price - a.price);
      }
      // ORDENAMIENTO POR CALIFICACION
      else if (orderFilter == "rate_menor"){
        this.filteredProducts.sort((a:any, b:any) => a.average_score - b.average_score);
      }
      else if (orderFilter == "rate_mayor"){
        this.filteredProducts.sort((a:any, b:any) => b.average_score - a.average_score);
      }
    }
    this.products = this.filteredProducts;
  }

}
