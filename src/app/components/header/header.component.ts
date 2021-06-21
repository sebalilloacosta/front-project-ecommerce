import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../interfaces/Category';
import { CategoriesService } from '../../services/categories/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Output() public sidenavToggle = new EventEmitter();

  categories:Category[] = [];

  constructor(public service:CategoriesService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      document.getElementById('iconUser')!.style.display='none';
    }
    else {
      document.getElementById('loggedUser')!.style.display='none';
    }

    if (window.screen.width < 599) {
      if (localStorage.getItem('accessToken')) {
        document.getElementById('resIconUser')!.style.display='none';
      }
      else {
        document.getElementById('resLoggedUser')!.style.display='none';
      }
    }
    else {
      if (localStorage.getItem('accessToken')) {
        document.getElementById('iconUser')!.style.display='none';
      }
      else {
        document.getElementById('loggedUser')!.style.display='none';
      }
    }
    this.service.getCategories();
    this.categories = this.service.categories;
  }
    

  public onToggleSideNav = () => {
    this.sidenavToggle.emit();
  }

  getCategoryId(id:string, name:string) {
    this.service.category_id = id;
    this.router.navigate([`/category/${id}`]).then(() => {
      window.location.reload();
    });
    // name.split(' ').join('-').toLowerCase()
  }

  cerrarSesion() {
    localStorage.removeItem('accessToken');
    window.location.reload();
  }

}


