import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../interfaces/Category';
import { CategoriesService } from '../../services/categories/categories.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  categoriesResMenu:Category[] = [];

  constructor(public service:CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.categoriesResMenu = this.service.categories;
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  getCategoryId(id:string) {
    this.service.category_id = id;
    this.service.products = [];
    this.router.navigate([`/category/${id}`]);
  }

  toHome() {
    this.router.navigate([`/home`]);
  }

}
