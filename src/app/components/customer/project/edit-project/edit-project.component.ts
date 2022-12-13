import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectCustomerComponent {
  category: any;
  branchOffice: any;
  nameProject: any;
  descriptionEquipment: any;
  descriptionProject: any;
  equipment: any
  srcResult: any
  file: any
  dataSource = ELEMENT_DATA;
  

  constructor(private dialogRef: MatDialogRef<EditProjectCustomerComponent>) {}
  categories: Category[] = [
    { value: 'mecanica-0', viewValue: 'Mecánica' },
    { value: 'electrica-1', viewValue: 'Eléctrica' },
  ]

  close() {
    this.dialogRef.close()
  }

  update() {
    console.log(this.nameProject);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file')

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader()

      reader.onload = (e: any) => {
        this.srcResult = e.target.result
      }

      reader.readAsArrayBuffer(inputNode.files[0])
    }
  }
}

export interface Project {
  id: string
  name: string
  category: string
  description: string
  company: string
  qr: string
}

const ELEMENT_DATA: Project[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Planta Agua Dulce AcetiOxígeno',
    category: 'Eléctrica',
    description: 'Este es la descripción de planta eléctrica.',
    company: 'Siesa',
    qr: '../../../../assets/project/qr-code.webp',
  },
]

interface Category {
  value: string
  viewValue: string
}