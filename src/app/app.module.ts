import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterCustomerComponent } from './components/admin/customer/register-customer/register-customer.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { EditCustomerComponent } from './components/admin/customer/edit-customer/edit-customer.component';
import { SeeCustomersComponent } from './components/admin/customer/see-customers/see-customers.component';
import { AddProjectComponent } from './components/admin/project/add-project/add-project.component';
import { EditProjectComponent } from './components/admin/project/edit-project/edit-project.component';
import { ProjectAdminComponent } from './components/admin/project/project-admin/project-admin.component';
import { HomeCustomerComponent } from './components/customer/home-customer/home-customer.component';
import { SeeProjectComponent } from './shared/project/see-project/see-project.component';
import { LoginComponent } from './shared/login/login.component';
import { AddProjectCustomerComponent } from './components/customer/project/add-project/add-project.component';
import { EditProjectCustomerComponent } from './components/customer/project/edit-project/edit-project.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterCustomerComponent,
    HomeAdminComponent,
    EditCustomerComponent,
    SeeCustomersComponent,
    AddProjectComponent,
    EditProjectComponent,
    ProjectAdminComponent,
    HomeCustomerComponent,
    SeeProjectComponent,
    LoginComponent,
    AddProjectCustomerComponent,
    EditProjectCustomerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}