import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { Company } from 'src/app/model/company.model';
import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';
import { CategoryService } from 'src/app/services/category.service';
import { CompanyService } from 'src/app/services/company.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { CategoryComponent } from './category/category.component';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';
import { CompanyComponent } from './company/company.component';
import { DeleteCompanyComponent } from './company/delete-company/delete-company.component';
import { DeleteRoleComponent } from './role/delete-role/delete-role.component';
import { RoleComponent } from './role/role.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent implements AfterViewInit, OnInit {
  login = localStorage.getItem('userActive');
  search: any;
  searchCategory: any;
  searchRole: any;
  searchUser: any;
  dataSource = new MatTableDataSource<Company>();
  dataSourceCategory = new MatTableDataSource<Category>();
  dataSourceRole = new MatTableDataSource<Role>();
  dataSourceUser = new MatTableDataSource<User>();
  displayedColumns: string[] = ['logo', 'name', 'icons'];
  displayedColumnsCategory: string[] = ['id', 'name', 'icons'];
  displayedColumnsRole: string[] = ['id', 'name', 'icons'];
  displayedColumnsUser: string[] = ['username', 'company', 'role', 'icons'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private companyService: CompanyService,
    private categoryService: CategoryService,
    private roleService: RoleService,
    private userService: UserService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceCategory.paginator = this.paginator;
    this.dataSourceRole.paginator = this.paginator;
    this.dataSourceUser.paginator = this.paginator;
  }

  ngOnInit() {
    this.getCompanies();
    this.getCategories();
    this.getRoles();
    this.getUsers();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter);
    };
    this.dataSourceCategory.filterPredicate = function (
      data,
      filter: string
    ): boolean {
      return data.name.toLowerCase().includes(filter);
    };
    this.dataSourceRole.filterPredicate = function (
      data,
      filter: string
    ): boolean {
      return data.name.toLowerCase().includes(filter);
    };
    this.dataSourceUser.filterPredicate = function (
      data,
      filter: string
    ): boolean {
      return (
        data.username.toLowerCase().includes(filter) ||
        data.company.toLowerCase().includes(filter) ||
        data.role.toLowerCase().includes(filter)
      );
    };
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.dataSourceCategory.data = res;
    });
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  getRoles() {
    this.roleService.getRoles().subscribe((res: any) => {
      this.dataSourceRole.data = res;
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.dataSourceUser.data = res;
    });
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  applyFilterCategory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSourceCategory.filter = filterValue;
  }

  applyFilterRole(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSourceRole.filter = filterValue;
  }

  applyFilterUserOrCompany(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSourceUser.filter = filterValue;
  }

  createCompany() {
    this.dialog.open(CompanyComponent, {
      width: '500px',
      height: '340px',
    });
  }

  createCategory() {
    this.dialog.open(CategoryComponent, {
      width: '500px',
      height: '250px',
    });
  }

  createRole() {
    this.dialog.open(RoleComponent, {
      width: '500px',
      height: '250px',
    });
  }

  createUser() {
    this.dialog.open(UserComponent, {
      width: '500px',
      height: '500px',
    });
  }

  openDialogDelete(id: string): void {
    this.dialog.open(DeleteCompanyComponent, {
      width: '250px',
      height: '150px',
      data: { id },
    });
  }

  openDialogDeleteCategory(id: string): void {
    this.dialog.open(DeleteCategoryComponent, {
      width: '250px',
      height: '150px',
      data: { id },
    });
  }

  openDialogDeleteRole(id: string): void {
    this.dialog.open(DeleteRoleComponent, {
      width: '250px',
      height: '150px',
      data: { id },
    });
  }

  openDialogDeleteUser(id: string): void {
    this.dialog.open(DeleteUserComponent, {
      width: '250px',
      height: '150px',
      data: { id },
    });
  }

  returnToLogin() {
    this.router.navigate(['/login']);
  }

  resetFilters() {
    this.dataSource.filter = '';
    this.search = '';
  }

  resetFiltersCategory() {
    this.dataSourceCategory.filter = '';
    this.searchCategory = '';
  }

  resetFiltersRole() {
    this.dataSourceRole.filter = '';
    this.searchRole = '';
  }

  resetFiltersUser() {
    this.dataSourceUser.filter = '';
    this.searchUser = '';
  }
}
