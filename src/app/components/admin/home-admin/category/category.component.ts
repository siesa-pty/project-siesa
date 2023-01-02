import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CategoryComponent>,
    private categoryService: CategoryService,
    public dialog: MatDialog,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    })
  }

  close() {
    this.dialogRef.close()
  }

  async addCategory() {
    if (this.form.valid) {
      const name = this.form.get('name')?.value

      const category = {
        name: name,
      }
      this.categoryService.addCategory(category).subscribe(() => {
        const msg = 'Categoría agregada exitosamente.'
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
