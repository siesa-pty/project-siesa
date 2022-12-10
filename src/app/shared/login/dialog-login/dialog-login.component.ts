import { Component } from '@angular/core'
import { User } from '../../../model/user.model'
import { MatDialogRef } from '@angular/material/dialog'
import { UserService } from 'src/app/services/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css'],
})
export class DialogLoginComponent {
  username!: string
  password!: string

  constructor(
    private dialogRef: MatDialogRef<DialogLoginComponent>,
    private userService: UserService,
    private router: Router,
  ) {}
  hide = true

  close() {
    this.dialogRef.close()
  }

  login() {
    this.userService.login(this.username, this.password).subscribe((data) => {
      if (data.msg === 'Usuario logueado exitosamente.') { 
        this.router.navigate(['/home-customer']);
        this.dialogRef.close();
        localStorage.setItem('userActive', JSON.stringify(data.User.userName));
      } else {
       window.alert("Usuario o contraseña incorrecto.")
      }
    });
  }
}
