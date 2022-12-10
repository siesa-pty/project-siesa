import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCustomerComponent } from './components/customer/home-customer/home-customer.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "home-customer", component: HomeCustomerComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
