import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/model/project.model';
import { EquipmentService } from 'src/app/services/equipment.service';
import { ProjectService } from 'src/app/services/project.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css'],
})
export class EquipmentComponent implements OnInit {
  form: FormGroup;
  srcResult: any;
  file: any;
  fileLength: any;
  files!: FileList;
  filesEquipment: any;
  qrCodeImage!: any;
  projects: any = new Project();
  names: any;
  project: any = localStorage.getItem('project');
  projectNames: any;

  constructor(
    private dialogRef: MatDialogRef<EquipmentComponent>,
    private equipmentService: EquipmentService,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      projectNames: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.getProjects();
  }

  close() {
    this.dialogRef.close();
  }

  getProjects() {
    this.projectService.getProjects().subscribe((res: any) => {
      this.projects.data = res;
      this.projectNames = this.projects.data.map((project: any) => project.name);
    });
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.fileLength = `${files.length} archivos subidos`;
    if (files.length === 1) {
      this.fileLength = `${files.length} archivo subido`;
    }
    if (files.length < 6) {
      this.equipmentService.uploadFile(files).subscribe((data: any) => {
        if (data.msg === 'Archivos subidos exitosamente' && data.length > 0) {
          const msg = data.msg;
          this.filesEquipment = data.filename;
          this.dialog.open(DialogComponent, {
            width: '250px',
            height: '150px',
            data: { msg },
          });
          return this.filesEquipment;
        } else {
          const msg = 'Solo se permiten archivos pdf.';
          this.fileLength = `Subir planos`;
          this.dialog.open(DialogComponent, {
            width: '250px',
            height: '150px',
            data: { msg },
          });
        }
      });
    } else {
      const msg = 'Solo se permite un máximo de 5 archivos.';
      this.fileLength = `Subir planos`;
      this.dialog.open(DialogComponent, {
        width: '250px',
        height: '150px',
        data: { msg },
      });
    }
  }

  async addEquipment() {
    if (this.form.valid) {
      const name = this.form.get('name')?.value;
      const description = this.form.get('description')?.value;
      const project = JSON.parse(this.project);

      const qrCode = await QRCode.toDataURL(
        `Nombre: ${name}\nDescripción del equipo: ${description}\nNombre del proyecto: ${project}`
      );

      const equipment = {
        name: name,
        description: description,
        projectName: project,
        files: this.filesEquipment,
        qr: qrCode,
      };

      this.equipmentService.addEquipment(equipment).subscribe(() => {
        const msg = 'Equipo agregado exitosamente.';
        this.dialogRef.close();
        this.dialog.open(DialogComponent, {
          width: '250px',
          height: '150px',

          data: { msg },
        });
      });
    }
  }
}
