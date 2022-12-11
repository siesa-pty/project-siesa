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
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarLoginComponent } from './shared/login/navbar-login/navbar-login.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DialogLoginComponent } from './shared/login/dialog-login/dialog-login.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarCustomerComponent } from './components/customer/home-customer/navbar-customer/navbar-customer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

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
    NavbarLoginComponent,
    DialogLoginComponent,
    NavbarCustomerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    HttpClientModule,
    MatTabsModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
