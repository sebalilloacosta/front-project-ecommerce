import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/Product';
import { CategoriesService } from '../../services/categories/categories.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  found_products:Product[] = [];
  filtered_products:Product[] = [];
  filtersForm_new:FormGroup;

  constructor(
    private ActiveRoute:ActivatedRoute, 
    public service:CategoriesService,
    private router: Router,
    public fb:FormBuilder) {
      this.filtersForm_new = fb.group({
        ordenarPor:new FormControl(''),
        marca:new FormControl('')
      });
    }

  ngOnInit(): void {
    this.ActiveRoute.paramMap.subscribe( (paramMap:any) =>{
      this.found_products = this.service.search_products;
      const {params} = paramMap;
      this.service.searchProducts(params['string']);
    });
  }

  getProductId(id:string) {
    this.service.product_id = id;
    this.service.search_products = [];
    this.router.navigate([`/products/${id}`]);
  }

  onSubmit() {
    this.found_products = this.service.search_products;
    this.filtered_products = [];
    let orderFilter = this.filtersForm_new.controls['ordenarPor'].value;
    let brandFilter = this.filtersForm_new.controls['marca'].value;

    if (brandFilter == "" && orderFilter == "") {
      this.filtered_products = this.service.search_products;
    }
    else if (brandFilter != "" && orderFilter != "") {
      // FILTRO POR MARCA
      for (let i = 0; i < this.found_products.length; i++) {
        if(brandFilter == this.found_products[i].brand_id) {
          this.filtered_products.push(this.found_products[i])
          // ORDENAMIENTO POR PRECIO
          if(orderFilter == "price_menor") {
            this.filtered_products.sort((a:any, b:any) => a.price - b.price);
          }
          else if (orderFilter == "price_mayor") {
            this.filtered_products.sort((a:any, b:any) => b.price - a.price);
          }
          // ORDENAMIENTO POR CALIFICACION
          else if (orderFilter == "rate_menor"){
            this.filtered_products.sort((a:any, b:any) => a.average_score - b.average_score);
          }
          else if (orderFilter == "rate_mayor"){
            this.filtered_products.sort((a:any, b:any) => b.average_score - a.average_score);
          }
        }
      }
    }
    else if (brandFilter != "" && orderFilter == ""){
      // FILTRO POR MARCA
      for (let i = 0; i < this.found_products.length; i++) {
        if(brandFilter == this.found_products[i].brand_id) {
          this.filtered_products.push(this.found_products[i])
        }
      }
    }
    else if (brandFilter == "" && orderFilter != "") {
      this.filtered_products = this.service.search_products;
      // ORDENAMIENTO POR PRECIO
      if(orderFilter == "price_menor") {
        this.filtered_products.sort((a:any, b:any) => a.price - b.price);
      }
      else if (orderFilter == "price_mayor") {
        this.filtered_products.sort((a:any, b:any) => b.price - a.price);
      }
      // ORDENAMIENTO POR CALIFICACION
      else if (orderFilter == "rate_menor"){
        this.filtered_products.sort((a:any, b:any) => a.average_score - b.average_score);
      }
      else if (orderFilter == "rate_mayor"){
        this.filtered_products.sort((a:any, b:any) => b.average_score - a.average_score);
      }
    }
    this.found_products = this.filtered_products;
  }

}
