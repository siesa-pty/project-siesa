import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent {
  constructor(
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  delete() {
    this.projectService.deleteProject(this.data.id).subscribe(() => {
      location.reload()
    })
  }
}
