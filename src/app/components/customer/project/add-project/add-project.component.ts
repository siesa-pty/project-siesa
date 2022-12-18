import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../../../../model/project.model'


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectCustomerComponent {
  category: any;
  branchOffice: any;
  name: any;
  description: any;
  descriptionProject: any;
  equipmentName: any
  srcResult: any;
  file: any;
  fileLength: any;
  files!: FileList;


  constructor(private dialogRef: MatDialogRef<AddProjectCustomerComponent>, private projectService: ProjectService){}
  categories: Category[] = [
    { value: 'mecanica-0', viewValue: 'Mecánica' },
    { value: 'electrica-1', viewValue: 'Eléctrica' },
  ]

  close() {
    this.dialogRef.close()
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.fileLength = `${files.length} archivos subidos`;
    if (files.length === 1) {
      this.fileLength = `${files.length} archivo subido`;
    }
    if (files.length < 6) {
      this.projectService.uploadFile(files).subscribe((data: any) => {
        if (data.msg === 'Archivos subidos exitosamente') {
          alert(data.msg);
          console.log(data);
        } 
      })
    } else {
      alert("Solo se permite un máximo de 5 archivos.")
      this.fileLength = `Subir planos`;
    }
  }

  addProject() {
    const project = {
      name: this.name,
      descriptionProject: this.descriptionProject,
      category: this.category,
      branchOffice: this.branchOffice,
      equipmentName: this.equipmentName,
      description: this.description
    }
    this.projectService.addProject(project).subscribe(data => {
      console.log(data);
      alert("Proyecto agregado exitosamente!");
    });
  }
}

interface Category {
  value: string
  viewValue: string
}