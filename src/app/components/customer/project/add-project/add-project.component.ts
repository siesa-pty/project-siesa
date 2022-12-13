import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectCustomerComponent {
  category: any;
  branchOffice: any;
  nameProject: any;
  descriptionEquipment: any;
  descriptionProject: any;
  equipment: any
  srcResult: any;
  file: any;

  constructor(private dialogRef: MatDialogRef<AddProjectCustomerComponent>){}
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
}

interface Category {
  value: string
  viewValue: string
}