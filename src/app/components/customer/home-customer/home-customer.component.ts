import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectCustomerComponent } from '../project/add-project/add-project.component';
import { EditProjectCustomerComponent } from '../project/edit-project/edit-project.component';
import { Router } from '@angular/router';
import { Project } from 'src/app/model/project.model';
import { ProjectService } from 'src/app/services/project.service';

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
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class HomeCustomerComponent implements OnInit, AfterViewInit {
  categories: Category[] = [
    { value: 'mecanica-0', viewValue: 'Mecánica' },
    { value: 'electrica-1', viewValue: 'Eléctrica' },
  ];
  constructor(public dialog: MatDialog, private router: Router, private projectService: ProjectService ) {}

  project: Project[] = [];
  dataSource = new MatTableDataSource<Project>();
  columnsToDisplay = [/*'logo',*/ 'name', 'sucursal', 'category'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Project;
  selected: any;
  search: any;
  category: any;
  login = localStorage.getItem('userActive');
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getProjects();
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return (
        data.category.toLowerCase().includes(filter) ||
        data.name.toLowerCase().includes(filter)
      );
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe((res)=>{
        this.dataSource.data = res;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  filterCategory(category: string) {
    if (category) {
      this.dataSource.filter = category.trim().toLowerCase();
    }
  }

  returnToLogin() {
    this.router.navigate(['/login']);
  }

  resetFilters() {
    this.dataSource.filter = '';
    this.search = '';
    this.category = '';
  }

  openDialogAdd(): void {
    this.dialog.open(AddProjectCustomerComponent, {
      width: '700px',
      height: '700px',
    });
  }

  openDialogUpdate(): void {
    this.dialog.open(EditProjectCustomerComponent, {
      width: '700px',
      height: '700px',
    });
  }

  openDialogDelete(): void {
    window.confirm('¿Esta seguro que desea eliminar el proyecto?');
  }
}

interface Category {
  value: string;
  viewValue: string;
}