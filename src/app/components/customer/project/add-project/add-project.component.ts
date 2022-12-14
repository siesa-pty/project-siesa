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


  constructor(private dialogRef: MatDialogRef<AddProjectCustomerComponent>, private projectService: ProjectService){}
  categories: Category[] = [
    { value: 'mecanica-0', viewValue: 'Mecánica' },
    { value: 'electrica-1', viewValue: 'Eléctrica' },
  ]

  close() {
    this.dialogRef.close()
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
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
    });
  }
}

interface Category {
  value: string
  viewValue: string
}