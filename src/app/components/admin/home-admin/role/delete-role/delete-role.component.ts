import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.css']
})
export class DeleteRoleComponent {
  constructor(
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  delete() {
    this.roleService.deleteRole(this.data.id).subscribe(() => {
      location.reload()
    })
  }
}
