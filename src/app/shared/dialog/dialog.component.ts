import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  reload() {
    if (
      !(
        this.data.msg === 'Archivos subidos exitosamente' ||
        this.data.msg === 'Archivo subido exitosamente' ||
        this.data.msg === 'Solo se permiten archivos pdf.' ||
        this.data.msg === 'Solo se permite un máximo de 5 archivos.' ||
        this.data.msg === 'Solo se permiten archivos png, jpg, webp y svg.' ||
        this.data.msg === 'Solo se permite un máximo de 1 archivo.' 
      )
    ) {
      location.reload()
    }
  }
}
