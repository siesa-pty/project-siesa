import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CompanyService } from 'src/app/services/company.service'

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css'],
})
export class DeleteCompanyComponent {
  constructor(
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  delete() {
    this.companyService.deleteCompany(this.data.id).subscribe(() => {
      location.reload()
    })
  }
}
