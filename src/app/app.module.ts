import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { HomeCustomerComponent } from './components/customer/home-customer/home-customer.component';
import { SeeProjectComponent } from './shared/project/see-project/see-project.component';
import { LoginComponent } from './shared/login/login.component';
import { AddProjectCustomerComponent } from './components/customer/project/add-project/add-project.component';
import { EditProjectCustomerComponent } from './components/customer/project/edit-project/edit-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DeleteProjectComponent } from './components/customer/project/delete-project/delete-project.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { SeeProjectPlansComponent } from './components/customer/project/see-project-plans/see-project-plans.component';
import { CompanyComponent } from './components/admin/home-admin/company/company.component';
import { DeleteCompanyComponent } from './components/admin/home-admin/company/delete-company/delete-company.component';
import { CategoryComponent } from './components/admin/home-admin/category/category.component';
import { DeleteCategoryComponent } from './components/admin/home-admin/category/delete-category/delete-category.component';
import { RoleComponent } from './components/admin/home-admin/role/role.component';
import { DeleteRoleComponent } from './components/admin/home-admin/role/delete-role/delete-role.component';
import { UserComponent } from './components/admin/home-admin/user/user.component';
import { DeleteUserComponent } from './components/admin/home-admin/user/delete-user/delete-user.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProjectComponent } from './components/admin/home-admin/project/project.component';
import { EquipmentComponent } from './components/admin/home-admin/equipment/equipment.component';
import { DeleteEquipmentComponent } from './components/admin/home-admin/equipment/delete-equipment/delete-equipment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeAdminComponent,
    HomeCustomerComponent,
    SeeProjectComponent,
    LoginComponent,
    AddProjectCustomerComponent,
    EditProjectCustomerComponent,
    NavbarLoginComponent,
    DialogLoginComponent,
    NavbarCustomerComponent,
    DeleteProjectComponent,
    DialogComponent,
    SeeProjectPlansComponent,
    CompanyComponent,
    DeleteCompanyComponent,
    CategoryComponent,
    DeleteCategoryComponent,
    RoleComponent,
    DeleteRoleComponent,
    UserComponent,
    DeleteUserComponent,
    ProjectComponent,
    EquipmentComponent,
    DeleteEquipmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatSortModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
