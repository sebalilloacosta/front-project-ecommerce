import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CategoryComponent } from './pages/category/category.component';
import { CartComponent } from './pages/cart/cart.component';
import { SearchComponent } from './pages/search/search.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RateComponent } from './pages/rate/rate.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdminUsersComponent } from './pages/admin-panel/admin-users/admin-users.component';
import { AdminOrdersComponent} from './pages/admin-panel/admin-orders/admin-orders.component';
import { AdminLoginComponent } from './pages/admin-panel/admin-login/admin-login.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', redirectTo: '', component:HomeComponent},
  {path: 'products/:product', component:ProductComponent},
  {path: 'login', component:LoginComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'category/:category_id', component:CategoryComponent},
  {path: 'cart', component:CartComponent},
  {path: 'search/:string', component:SearchComponent},
  {path: 'checkout', component:CheckoutComponent},
  {path: 'orders', component:OrdersComponent},
  {path: 'rate/:order_id/:product_id', component:RateComponent},
  {path: 'admin-panel', component: AdminPanelComponent},
  {path: 'admin-panel/login', component:AdminLoginComponent},
  {path: 'admin-panel/users', component: AdminUsersComponent},
  {path: 'admin-panel/orders', component: AdminOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
