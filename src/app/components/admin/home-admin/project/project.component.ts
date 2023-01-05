import { Component, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ProjectService } from 'src/app/services/project.service'
import * as QRCode from 'qrcode'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DialogComponent } from 'src/app/shared/dialog/dialog.component'
import { CategoryService } from 'src/app/services/category.service'
import { Category } from 'src/app/model/category.model'
import { format } from 'date-fns';
import { CompanyService } from 'src/app/services/company.service'
import { Company } from 'src/app/model/company.model'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit{
  form: FormGroup
  srcResult: any
  file: any
  fileLength: any
  files!: FileList
  filesProject: any
  qrCodeImage!: any
  categories: any = new Category();
  companies: any = new Company();
  names: any;
  endDate!: Date;
  company: any = localStorage.getItem('company');
  companyNames: any;
  
  constructor(
    private dialogRef: MatDialogRef<ProjectComponent>,
    private projectService: ProjectService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private companyService: CompanyService,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      descriptionProject: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      branchOffice: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      supplier: new FormControl('', Validators.required),
    })
  }
  ngOnInit(): void {
    this.getCategories();
    this.getCompanies();
  }

  close() {
    this.dialogRef.close()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories.data = res;
      this.names = this.categories.data.map((category: any) => category.name);
    });
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe((res: any) => {
      this.companies.data = res;
      this.companyNames = this.companies.data.map((company: any) => company.name);
    });
  }

  onFileSelected(event: any) {
    const files = event.target.files
    this.fileLength = `${files.length} archivos subidos`
    if (files.length === 1) {
      this.fileLength = `${files.length} archivo subido`
    }
    if (files.length < 6) {
      this.projectService.uploadFile(files).subscribe((data: any) => {
        if (data.msg === 'Archivos subidos exitosamente' && data.length > 0) {
          const msg = data.msg;
          this.filesProject = data.filename
          this.dialog.open(DialogComponent, {
            width: '250px',
            height: '150px',
            data: { msg },
          });
          return this.filesProject
        } else {
          const msg = 'Solo se permiten archivos pdf.';
          this.fileLength = `Subir planos`;
          this.dialog.open(DialogComponent, {
            width: '250px',
            height: '150px',
            data: { msg },
          });
        }
      })
    } else {
      const msg = 'Solo se permite un máximo de 5 archivos.';
      this.fileLength = `Subir planos`
      this.dialog.open(DialogComponent, {
        width: '250px',
        height: '150px',
        data: { msg },
      });
    }
  }

  async addProject() {
    if (this.form.valid) {
      const name = this.form.get('name')?.value
      const descriptionProject = this.form.get('descriptionProject')?.value
      const category = this.form.get('category')?.value
      const branchOffice = this.form.get('branchOffice')?.value
      const company = JSON.parse(this.company);
      const endDate = this.form.get('endDate')?.value;
      const formattedEndDate = format(endDate, 'MM/dd/yyyy');
      const supplier = this.form.get('supplier')?.value

      const qrCode = await QRCode.toDataURL(
        `Nombre: ${name}\nDescripción del proyecto: ${descriptionProject}\nCategoría: ${category}\nSucursal: ${branchOffice}\nNombre de compañia: ${company}\Fecha de finalización: ${endDate}\nProveedor: ${supplier}`,
      )

      const project = {
        name: name,
        descriptionProject: descriptionProject,
        category: category,
        branchOffice: branchOffice,
        company: company,
        endDate: formattedEndDate,
        supplier: supplier,
        files: this.filesProject,
        qr: qrCode,
      }

      this.projectService.addProject(project).subscribe(() => {
        const msg = 'Proyecto agregado exitosamente.';
        this.dialogRef.close();
        this.dialog.open(DialogComponent, {
          width: '250px',
          height: '150px',
          data: { msg },
        });
      })
    }
  }
}
