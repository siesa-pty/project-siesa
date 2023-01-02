import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { CompanyService } from '../../../../services/company.service'
import { DialogComponent } from '../../../../shared/dialog/dialog.component'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent {
  form: FormGroup
  srcResult: any
  file: any
  fileLength: any
  files!: FileList
  filesProject: any

  constructor(
    private dialogRef: MatDialogRef<CompanyComponent>,
    private companyService: CompanyService,
    public dialog: MatDialog,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    })
  }

  close() {
    this.dialogRef.close()
  }

  async addCompany() {
    if (this.form.valid) {
      const name = this.form.get('name')?.value

      const company = {
        name: name,
        files: this.filesProject,
      }
      this.companyService.addProject(company).subscribe(() => {
        const msg = 'Compañia agregada exitosamente.'
        this.dialogRef.close()
        this.dialog.open(DialogComponent, {
          width: '250px',
          height: '150px',
          data: { msg },
        })
      })
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files
    if (files.length === 1) {
      this.fileLength = `${files.length} archivo subido`
    }
    if (files.length < 6) {
      this.companyService.uploadFile(files).subscribe((data: any) => {
        if (data.msg === 'Archivo subido exitosamente' && data.length > 0) {
          const msg = data.msg
          this.filesProject = data.filename
          this.dialog.open(DialogComponent, {
            width: '250px',
            height: '150px',
            data: { msg },
          })
          return this.filesProject
        } else {
          const msg = 'Solo se permiten archivos png, jpg, webp y svg.'
          this.fileLength = `Subir logo`
          this.dialog.open(DialogComponent, {
            width: '250px',
            height: '150px',
            data: { msg },
          })
        }
      })
    } else {
      const msg = 'Solo se permite un máximo de 1 archivo.'
      this.fileLength = `Subir logo`
      this.dialog.open(DialogComponent, {
        width: '250px',
        height: '150px',
        data: { msg },
      })
    }
  }
}
