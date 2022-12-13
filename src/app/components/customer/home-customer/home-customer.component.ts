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
  constructor(public dialog: MatDialog, private router: Router) {}

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  columnsToDisplay = ['logo', 'name', 'sucursal', 'category'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Project;
  selected: any;
  search: any;
  category: any;
  login = localStorage.getItem('userActive');
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
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

export interface Project {
  id: string;
  name: string;
  descriptionProyecto: string;
  category: string;
  sucursal: string;
  equipo: string;
  logo: string;
  descriptionEquipo: string;
  qr: string;
}

const ELEMENT_DATA: Project[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'AcetiOxígeno',
    descriptionProyecto: 'Este es la descripción de planta eléctrica.',
    category: 'Eléctrica',
    sucursal: 'Agua Dulce',
    equipo: 'M1000',
    descriptionEquipo: 'Este es la descripción del equipo eléctrica.',
    logo: '../../../../assets/img/logo-cliente.png',
    qr: '../../../../assets/project/qr-code.webp',
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174000',
    name: 'AcetiOxígeno',
    descriptionProyecto: 'Este es la descripción de planta mecanica.',
    category: 'Mecánica',
    sucursal: 'Chiriqui',
    equipo: 'M2000',
    descriptionEquipo: 'Este es la descripción de equipo mecanico.',
    logo: '../../../../assets/img/logo-cliente.png',
    qr: '../../../../assets/project/qr-code.webp',
  },
  {
    id: 'ab124567-e89b-12d3-a456-42523174000',
    name: 'AcetiOxígeno',
    descriptionProyecto: 'Este es la descripción de planta eléctrica.',
    category: 'Eléctrica',
    sucursal: 'Colon',
    equipo: 'M3000',
    descriptionEquipo: 'Este es la descripción de equipo eléctrica.',
    logo: '../../../../assets/img/logo-cliente.png',
    qr: '../../../../assets/project/qr-code.webp',
  },
  {
    id: 'e4567ln1-e89b-12d3-a456-42661413250',
    name: 'AcetiOxígeno',
    descriptionProyecto: 'Este es la descripción de planta mecanica.',
    category: 'Mecánica',
    sucursal: 'Santiago',
    equipo: 'M4000',
    descriptionEquipo: 'Este es la descripción de equipo mecanico.',
    logo: '../../../../assets/img/logo-cliente.png',
    qr: '../../../../assets/project/qr-code.webp',
  },
  {
    id: '489e4561-e12a-12d3-a456-42691874000',
    name: 'AcetiOxígeno',
    descriptionProyecto: 'Este es la descripción de planta eléctrica.',
    category: 'Eléctrica',
    sucursal: 'Cunayala',
    equipo: 'M5000',
    descriptionEquipo: 'Este es la descripción de equipo eléctrica.',
    logo: '../../../../assets/img/logo-cliente.png',
    qr: '../../../../assets/project/qr-code.webp',
  },
  {
    id: '123e45437-e89b-12a5-a123-426614174000',
    name: 'AcetiOxígeno',
    descriptionProyecto: 'Este es la descripción de planta mecanica',
    category: 'Mecánica',
    sucursal: 'Arraijan',
    equipo: 'M6000',
    descriptionEquipo: 'Este es la descripción de equipo mecanico.',
    logo: '../../../../assets/img/logo-cliente.png',
    qr: '../../../../assets/project/qr-code.webp',
  },
];
