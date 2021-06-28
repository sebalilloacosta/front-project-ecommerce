import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../interfaces/Category';
import { CategoriesService } from '../../services/categories/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories:Category[] = [];

  constructor(public service:CategoriesService, private router: Router) { 
  }

  ngOnInit(): void {
  }
  
  getCategoryId(id:string) {
    this.service.category_id = id;
    this.service.products = [];
    this.router.navigate([`/category/${id}`]);
  }
}
