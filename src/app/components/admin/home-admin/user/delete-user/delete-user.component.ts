import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  delete() {
    this.userService.deleteUser(this.data.id).subscribe(() => {
      location.reload()
    })
  }
}
