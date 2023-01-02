import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { HomeCustomerComponent } from './components/customer/home-customer/home-customer.component';
import { SeeProjectPlansComponent } from './components/customer/project/see-project-plans/see-project-plans.component';
import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "home-customer", component: HomeCustomerComponent, pathMatch: "full" },
  { path: "home-admin", component: HomeAdminComponent, pathMatch: "full" },
  { path: "see-plans/:id", component: SeeProjectPlansComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
