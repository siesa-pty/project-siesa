import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
export class HomeCustomerComponent {
  categories: Category[] = [
    { value: 'mecanica-0', viewValue: 'Mecánica' },
    { value: 'electrica-1', viewValue: 'Eléctrica' },
  ];

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'category'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: PeriodicElement;

  delete() {
    window.location.href = 'https://google.com';
  }
}

interface Category {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  id: string;
  name: string;
  category: string;
  description: string;
  company: string;
  qr: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Planta Eléctrica Agua Dulce AcetiOxígeno',
    category: 'Eléctrica',
    description: 'Este es la des de planta eléctrica.',
    company: 'Siesa',
    qr: '../../../../assets/project/qr-code.webp',
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174000',
    name: 'Planta Mecánica',
    category: 'Mecánica',
    description: 'Este es la des de plata mecánica.',
    company: 'Ofideusa',
    qr: '../../../../assets/project/qr-code.png',
  },
];
