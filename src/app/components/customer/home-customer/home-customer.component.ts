import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'

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
  categories: Category[] = [
    { value: 'mecanica-0', viewValue: 'Mecánica' },
    { value: 'electrica-1', viewValue: 'Eléctrica' },
  ]

  dataSource = new MatTableDataSource(ELEMENT_DATA)
  columnsToDisplay = ['name', 'category']
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand']
  expandedElement!: Project
  selected: any
  search: any
  category: any
  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngOnInit() {
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

  resetFilters() {
    this.dataSource.filter = ''
    this.search = ''
    this.category = ''
  }
}

interface Category {
  value: string
  viewValue: string
}

export interface Project {
  id: string
  name: string
  category: string
  description: string
  company: string
  qr: string
}

const ELEMENT_DATA: Project[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Planta Agua Dulce AcetiOxígeno',
    category: 'Eléctrica',
    description: 'Este es la descripción de planta eléctrica.',
    company: 'Siesa',
    qr: '../../../../assets/project/qr-code.webp',
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174000',
    name: 'Planta Manuel Perez',
    category: 'Mecánica',
    description: 'Este es la descripción de planta mecánica.',
    company: 'Planta Manuel',
    qr: '../../../../assets/project/qr-code.webp',
  },
  {
    id: 'ab124567-e89b-12d3-a456-42523174000',
    name: 'Planta Jose Fernandez',
    category: 'Mecánica',
    description: 'Este es la descripción de Planta Jose Fernandez',
    company: 'Jose Fernandez',
    qr: '../../../../assets/project/qr-code.webp',
  },
  {
    id: 'e4567ln1-e89b-12d3-a456-42661413250',
    name: 'Planta Jose domingo Espinar',
    category: 'Eléctrica',
    description: 'Este es la descripción de Planta Jose domingo Espinar',
    company: 'Planta Jose',
    qr: '../../../../assets/project/qr-code.webp',
  },
  {
    id: '489e4561-e12a-12d3-a456-42691874000',
    name: 'Planta Hector Duran',
    category: 'Eléctrica',
    description: 'Este es la descripción de Planta Hector Durán.',
    company: 'Hector',
    qr: '../../../../assets/project/qr-code.webp',
  },
  {
    id: '123e45437-e89b-12a5-a123-426614174000',
    name: 'Planta Fernandez Jose',
    category: 'Mecánica',
    description: 'Este es la descripción de Planta Fernández Jose',
    company: 'Planta Fernandez',
    qr: '../../../../assets/project/qr-code.webp',
  },
]
