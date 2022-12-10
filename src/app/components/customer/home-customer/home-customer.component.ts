import { Component } from '@angular/core';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.css'],
})
export class HomeCustomerComponent {
  expandedElement: any;
  columnsToDisplay: any;
  columnsToDisplayWithExpand: any;
  dataSource: any;

  categorys: Category[] = [
    { value: 'mecanica-0', viewValue: 'Mecánica' },
    { value: 'electrica-1', viewValue: 'Eléctrica' },
  ];
}
