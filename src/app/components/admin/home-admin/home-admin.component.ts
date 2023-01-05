import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { Company } from 'src/app/model/company.model';
import { Project } from 'src/app/model/project.model';
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
import { ProjectComponent } from './project/project.component';
import { DeleteRoleComponent } from './role/delete-role/delete-role.component';
import { RoleComponent } from './role/role.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { UserComponent } from './user/user.component';
/* Added by Hector */
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ProjectService } from 'src/app/services/project.service';
import { DeleteProjectComponent } from './project/delete-project/delete-project.component';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Equipment } from 'src/app/model/equipment.model';
import { EquipmentComponent } from './equipment/equipment.component';
import { DeleteEquipmentComponent } from './equipment/delete-equipment/delete-equipment.component';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
  /* Added by Hector */
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class HomeAdminComponent implements AfterViewInit, OnInit {
  login = localStorage.getItem('userActive');
  role = localStorage.getItem('role');
  search: any;
  searchCategory: any;
  searchRole: any;
  searchUser: any;
  searchProject: any;
  searchEquipment: any;
  dataSource = new MatTableDataSource<Company>();
  dataSourceCategory = new MatTableDataSource<Category>();
  dataSourceRole = new MatTableDataSource<Role>();
  dataSourceUser = new MatTableDataSource<User>();
  dataSourceProject = new MatTableDataSource<Project>();
  dataSourceEquipment = new MatTableDataSource<Equipment>();
  displayedColumns: string[] = ['logo', 'name', 'icons'];
  displayedColumnsCategory: string[] = ['id', 'name', 'icons'];
  displayedColumnsRole: string[] = ['id', 'name', 'icons'];
  displayedColumnsUser: string[] = ['username', 'company', 'role', 'icons'];
  displayedColumnsProject: string[] = ['name', 'branchOffice', 'category'];
  displayedColumnsEquipment: string[] = ['name', 'projectName'];

  expandedElement: any;
  columnsToDisplayWithExpand = [...this.displayedColumnsProject, 'expand'];
  columnsToDisplayWithExpandEquipment = [
    ...this.displayedColumnsEquipment,
    'expand',
  ];

  @ViewChild('companyPaginator') companyPaginator!: MatPaginator;
  @ViewChild('categoryPaginator') categoryPaginator!: MatPaginator;
  @ViewChild('rolePaginator') rolePaginator!: MatPaginator;
  @ViewChild('userPaginator') userPaginator!: MatPaginator;
  @ViewChild('projectPaginator') projectPaginator!: MatPaginator;
  @ViewChild('equipmentPaginator') equipmentPaginator!: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private companyService: CompanyService,
    private categoryService: CategoryService,
    private roleService: RoleService,
    private userService: UserService,
    private projectService: ProjectService,
    private equipmentService: EquipmentService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.companyPaginator;
    this.dataSourceCategory.paginator = this.categoryPaginator;
    this.dataSourceRole.paginator = this.rolePaginator;
    this.dataSourceUser.paginator = this.userPaginator;
    this.dataSourceProject.paginator = this.projectPaginator;
    this.dataSourceEquipment.paginator = this.equipmentPaginator;
  }

  ngOnInit() {
    this.getCompanies();
    this.getCategories();
    this.getRoles();
    this.getUsers();
    this.getProjects();
    this.getEquipments();

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
    /* Added by Hector */
    this.dataSourceProject.filterPredicate = function (
      data,
      filter: string
    ): boolean {
      return (
        data.name.toLowerCase().includes(filter) ||
        data.category.toLowerCase().includes(filter)
      );
    };
    this.dataSourceEquipment.filterPredicate = function (
      data,
      filter: string
    ): boolean {
      return (
        data.name.toLowerCase().includes(filter) ||
        data.projectName.toLowerCase().includes(filter)
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

  getProjects() {
    this.projectService.getProjects().subscribe((res) => {
      this.dataSourceProject.data = res;
    });
  }

  getEquipments() {
    this.equipmentService.getEquipments().subscribe((res) => {
      this.dataSourceEquipment.data = res;
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

  applyFilterProject(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSourceProject.filter = filterValue;
  }

   applyFilterEquipment(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSourceEquipment.filter = filterValue;
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

  createProject() {
    this.dialog.open(ProjectComponent, {
      width: '600px',
      height: '850px',
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

   createEquipment() {
    this.dialog.open(EquipmentComponent, {
      width: '600px',
      height: '850px',
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

  openDialogDeleteProject(id: string): void {
    this.dialog.open(DeleteProjectComponent, {
      width: '250px',
      height: '150px',
      data: { id },
    });
  }

  openDialogDeleteEquipment(id: string): void {
    this.dialog.open(DeleteEquipmentComponent, {
      width: '250px',
      height: '150px',
      data: { id },
    });
  }

  
  returnToLogin() {
    this.router.navigate(['/login']);
  }

  unauthorized() {
    this.router.navigate(['/home-customer']);
  }

  resetFilters() {
    this.dataSource.filter = '';
    this.search = '';
  }

  resetFiltersCategory() {
    this.dataSourceCategory.filter = '';
    this.searchCategory = '';
  }

  resetFiltersProject() {
    this.dataSourceProject.filter = '';
    this.searchProject = '';
  }

  resetFiltersRole() {
    this.dataSourceRole.filter = '';
    this.searchRole = '';
  }

  resetFiltersUser() {
    this.dataSourceUser.filter = '';
    this.searchUser = '';
  }

  resetFiltersEquipment() {
    this.dataSourceEquipment.filter = '';
    this.searchEquipment = '';
  }

  /* Added by Hector */
  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL();

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

  /* Added by Hector */
  async createPDF(
    name: string,
    descriptionProject: string,
    branchOffice: string,
    category: string,
    supplier: string,
    company: string,
    enddate: Date,
    id: string
  ) {
    const pdfDefinition: any = {
      info: {
        title: 'Siesa Proyectos',
      },
      pageMargins: [40, 40, 40, 40], // Add 40 points of margin on all sides of the content
      content: [
        {
          text: 'Tabla de datos\n\n',
          alignment: 'center',
          fontSize: 25,
          bold: true,
        },
        {
          table: {
            widths: [250, 250],
            body: [
              [
                { text: 'Información de la Empresa', bold: true, fontSize: 18 },
                { text: 'Información del Proyecto', bold: true, fontSize: 18 },
              ],
              [name, category],
              [descriptionProject, supplier],
              [branchOffice, company],
              [enddate, company],
            ],
          },
        },
        {
          text: '', // Add an empty text element to add space between the table and the next element
          margin: [0, 10], // Add a top margin of 10 points to the text element
        },
        {
          image: await this.getBase64ImageFromURL(
            '../../../../assets/img/logo-cliente.png'
          ),
          alignment: 'center',
          margin: [0, 20],
        },
        { qr: `http://localhost:4200/see-plans/${id}`, alignment: 'right' },
      ],
    };
    pdfMake.createPdf(pdfDefinition).open();
  }

  seePlans(id: string): void {
    this.router.navigate([`/see-plans/${id}`]);
  }

  /* seePlansEquipment(id: string): void {
    this.router.navigate([`/see-plans/${id}`]);
  } */
}
