import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog'
import { AddProjectCustomerComponent } from '../project/add-project/add-project.component'
import { EditProjectCustomerComponent } from '../project/edit-project/edit-project.component'
import { Router } from '@angular/router'
import { Project } from 'src/app/model/project.model'
import { ProjectService } from 'src/app/services/project.service'

import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { DeleteProjectComponent } from '../project/delete-project/delete-project.component'

;import { Category } from 'src/app/model/category.model'
import { CategoryService } from 'src/app/services/category.service'
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
})
export class HomeCustomerComponent implements OnInit, AfterViewInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private projectService: ProjectService,
    private categoryService: CategoryService,
  ) {}

  project: Project[] = []
  dataSource = new MatTableDataSource<Project>()
  columnsToDisplay = [/*'logo',*/ 'name', 'sucursal', 'category']
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand']
  expandedElement!: Project
  selected: any
  data!: any
  search: any
  category: any
  login = localStorage.getItem('userActive');
  company: any = localStorage.getItem('company');
  role = localStorage.getItem('role');
  @ViewChild(MatPaginator) paginator!: MatPaginator
  categories: any = new Category();
  names: any;

  ngOnInit() {
    this.getProjects();
    this.getCategories();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return (
        data.category.toLowerCase().includes(filter) ||
        data.name.toLowerCase().includes(filter)
      )
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories.data = res;
      this.names = this.categories.data.map((category: any) => category.name);
    });
  }

  getProjects() {
    this.projectService.getProjectByCompany(JSON.parse(this.company)).subscribe((res) => {
      this.dataSource.data = res
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase()
    this.dataSource.filter = filterValue
  }

  filterCategory(category: string) {
    if (category) {
      this.dataSource.filter = category.trim().toLowerCase()
    }
  }

  returnToLogin() {
    this.router.navigate(['/login'])
  }

  resetFilters() {
    this.dataSource.filter = ''
    this.search = ''
    this.category = ''
  }

  openDialogAdd(): void {
    this.dialog.open(AddProjectCustomerComponent, {
      width: '700px',
      height: '700px',
    })
  }

  openDialogUpdate(): void {
    this.dialog.open(EditProjectCustomerComponent, {
      width: '700px',
      height: '700px',
    })
  }

  openDialogDelete(id: string): void {
    this.dialog.open(DeleteProjectComponent, {
      width: '250px',
      height: '150px',
      data: { id },
    })
  }

  seePlans(id: string): void {
    this.router.navigate([`/see-plans/${id}`])
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
    
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);
    
        var dataURL = canvas.toDataURL();
    
        resolve(dataURL);
      };
    
      img.onerror = error => {
        reject(error);
      };
    
      img.src = url;
    });}

  async createPDF(
    name: string,
    descriptionProject: string,
    branchOffice: string,
    category: string,
    id: string,
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
              [descriptionProject, branchOffice],
            ],
          },
        },
        {
          text: '', // Add an empty text element to add space between the table and the next element
          margin: [0, 10], // Add a top margin of 10 points to the text element
        },
        {
          image: await this.getBase64ImageFromURL(
            "../../../../assets/img/logo-cliente.png"),
          alignment: 'center',
          margin: [0, 20], 
        },
        { qr: `http://localhost:4200/see-plans/${id}`, alignment: 'right' },
      ],
    }
    pdfMake.createPdf(pdfDefinition).open()
  }
}
