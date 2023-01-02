import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ActivatedRoute, Router } from '@angular/router'
import { ProjectService } from 'src/app/services/project.service'

@Component({
  selector: 'app-see-project-plans',
  templateUrl: './see-project-plans.component.html',
  styleUrls: ['./see-project-plans.component.css'],
})
export class SeeProjectPlansComponent implements OnInit {
  displayedColumns: string[] = ['position', 'link']
  id!: any
  dataSource!: any
  login = localStorage.getItem('userActive')

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.projectService.getProject(this.id).subscribe((data: any) => {
      this.dataSource = data
    })
  }

  returnToLogin() {
    this.router.navigate(['/login'])
  }
}