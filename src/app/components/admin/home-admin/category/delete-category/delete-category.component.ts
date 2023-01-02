import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  constructor(
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  delete() {
    this.categoryService.deleteCategory(this.data.id).subscribe(() => {
      location.reload()
    })
  }
}
