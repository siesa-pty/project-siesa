import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './schemas/project.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: '../frontend/src/assets/project',
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: {
        fileSize: 5000000,
      },
    }),
  )
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (files.length < 6) {
      for (const element of files) {
        if (element.mimetype === 'application/pdf' && element.size < 5000000) {
          this.projectService.uploadFile(element.originalname, element.buffer);
        } else {
          return {
            msg: 'Solo se permiten archivos pdf, y menores a 5 mb',
            statusCode: 400,
          };
        }
      }
      return {
        msg: 'Los archivos se han sido subido exitosamente',
        statusCode: 201,
      };
    } else {
      return {
        msg: 'Cantidad de archivos superior al limite.',
        statusCode: 400,
      };
    }
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }
}
