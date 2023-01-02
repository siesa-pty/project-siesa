import { Component } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ProjectService } from 'src/app/services/project.service'
import * as QRCode from 'qrcode'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DialogComponent } from 'src/app/shared/dialog/dialog.component'

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectCustomerComponent {
  form: FormGroup
  srcResult: any
  file: any
  fileLength: any
  files!: FileList
  filesProject: any
  qrCodeImage!: any

  constructor(
    private dialogRef: MatDialogRef<AddProjectCustomerComponent>,
    private projectService: ProjectService,
    public dialog: MatDialog,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      descriptionProject: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      branchOffice: new FormControl('', Validators.required),
      equipmentName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    })
  }
  categories: Category[] = [
    { value: 'mecanica-0', viewValue: 'Mecánica' },
    { value: 'electrica-1', viewValue: 'Eléctrica' },
  ]

  close() {
    this.dialogRef.close()
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
      const equipmentName = this.form.get('equipmentName')?.value
      const description = this.form.get('description')?.value

      const qrCode = await QRCode.toDataURL(
        `Nombre: ${name}\nDescripción del proyecto: ${descriptionProject}\nCategoría: ${category}\nSucursal: ${branchOffice}\nNombre del equipo: ${equipmentName}\nDescripción del equipo: ${description}`,
      )

      const project = {
        name: name,
        descriptionProject: descriptionProject,
        category: category,
        branchOffice: branchOffice,
        equipmentName: equipmentName,
        description: description,
        files: this.filesProject,
        qr: qrCode,
      }

      this.projectService.addProject(project).subscribe((data) => {
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

interface Category {
  value: string
  viewValue: string
}
