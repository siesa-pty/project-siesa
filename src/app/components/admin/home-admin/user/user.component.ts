import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  form: FormGroup;
  filteredCompanies!: Observable<Company[]>;
  companyControl = new FormControl();
  companies!: Company[];

  constructor(
    private dialogRef: MatDialogRef<UserComponent>,
    private userService: UserService,
    public dialog: MatDialog,
    private companyService: CompanyService
  ) {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.companyService.getCompanies().subscribe((companies) => {
      this.companies = companies;
      this.filteredCompanies = this.companyControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.filterCompanies(value))
      );
    });
  }

  private filterCompanies(value: string): Company[] { const filterValue = value.toLowerCase(); return this.companies.filter(company => company.name.toLowerCase().includes(filterValue)); }

  close() {
    this.dialogRef.close();
  }

  async addUser() {
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      const company = this.form.get('company')?.value;
      const role = this.form.get('role')?.value;

      const user = {
        username: username,
        password: password,
        company: company,
        role: role,
      };
      this.userService.addUser(user).subscribe(() => {
        const msg = 'Usuario agregado exitosamente.';
        this.dialogRef.close();
        this.dialog.open(DialogComponent, {
          width: '250px',
          height: '150px',
          data: { msg },
        });
      });
    }
  }
}
