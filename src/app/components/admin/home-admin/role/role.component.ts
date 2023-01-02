import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MatDialog } from '@angular/material/dialog'
import { RoleService } from 'src/app/services/role.service'
import { DialogComponent } from 'src/app/shared/dialog/dialog.component'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent {
  form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<RoleComponent>,
    private roleService: RoleService,
    public dialog: MatDialog,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    })
  }

  close() {
    this.dialogRef.close()
  }

  async addRole() {
    if (this.form.valid) {
      const name = this.form.get('name')?.value

      const role = {
        name: name,
      }
      this.roleService.addRole(role).subscribe(() => {
        const msg = 'Rol agregado exitosamente.'
        this.dialogRef.close()
        this.dialog.open(DialogComponent, {
          width: '250px',
          height: '150px',
          data: { msg },
        })
      })
    }
  }
}
