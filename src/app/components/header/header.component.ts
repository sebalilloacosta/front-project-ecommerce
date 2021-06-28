import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../interfaces/Category';
import { CategoriesService } from '../../services/categories/categories.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Output() public sidenavToggle = new EventEmitter();

  categories:Category[] = [];
  token:string = JSON.stringify(localStorage.getItem('accessToken'));
  searchForm:FormGroup;
  inputSearch:string = "";

  constructor(public service:CategoriesService, private router: Router, public fb:FormBuilder) {
    this.searchForm = fb.group({
      inputSearch:new FormControl('')
    });
   }

  ngOnInit(): void {
    this.service.getCategories();
    this.categories = this.service.categories;
  }
    
  public onToggleSideNav = () => {
    this.sidenavToggle.emit();
  }

  getCategoryId(id:string) {
    this.service.category_id = id;
    this.service.products = [];
    this.router.navigate([`/category/${id}`]);
  }

  cerrarSesion() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  toHome() {
    this.router.navigate([`/home`]);
  }

  toLogin() {
    this.router.navigate([`/login`]);
  }

  toRegister() {
    this.router.navigate([`/register`]);
  }

  toCart() {
    this.router.navigate([`/cart`]);
  }

  toProfile() {
    this.router.navigate([`/profile`]);
  }

  toOrders() {
    this.router.navigate([`/orders`]);
  }

  onSubmit() {
    let string_search = this.searchForm.controls['inputSearch'].value;
    string_search = string_search.split(' ').join('-');
    this.router.navigate([`/search/${string_search}`]).then(() => {
      window.location.reload();
    });
  }

}


