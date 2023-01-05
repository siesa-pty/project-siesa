import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Role } from 'src/app/model/role.model';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  form: FormGroup;
  filteredCompanies!: Observable<Company[]>;
  filteredRoles!: Observable<Role[]>;

  constructor(
    private dialogRef: MatDialogRef<UserComponent>,
    private userService: UserService,
    public dialog: MatDialog,
    private companyService: CompanyService,
    private roleService: RoleService,
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
      this.filteredCompanies = this.form.controls['company'].valueChanges.pipe(
        startWith(''),
        map((value) => this.filterCompanies(value, companies))
      );
    });

    this.roleService.getRoles().subscribe((roles) => {
      this.filteredRoles = this.form.controls['role'].valueChanges.pipe(
        startWith(''),
        map((value) => this.filterRoles(value, roles))
      );
    });
  }

  private filterCompanies(value: string, companies: Company[]): Company[] {
    const filterValue = value.toLowerCase();
    return companies.filter(
      (company) => company.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private filterRoles(value: string, roles: Role[]): Role[] {
    const filterValue = value.toLowerCase();
    return roles.filter(
      (role) => role.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

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
