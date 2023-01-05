import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-customer',
  templateUrl: './navbar-customer.component.html',
  styleUrls: ['./navbar-customer.component.css']
})
export class NavbarCustomerComponent {

  constructor(private router: Router){}

  logout() {
    localStorage.removeItem('userActive');
    localStorage.removeItem('company');
    localStorage.removeItem('role');
    this.router.navigate(['/login']) 
  }

}
