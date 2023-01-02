import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFiles,
  Delete,
  Param,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './schemas/project.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  arr: string[] = [];
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      limits: {
        fileSize: 5000000,
      },
      fileFilter: (req, file, callback) => {
        if (file.mimetype === 'application/pdf') {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      storage: diskStorage({
        destination: '../frontend/src/assets/project',
        filename(req, file, callback) {
          const uniqueSuffix = Date.now() + '-' + uuid();
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    const fileArray = [];
    for (const element of files) {
      fileArray.push(element.filename);
    }
    return {
      filename: fileArray,
      length: fileArray.length,
      msg: 'Archivos subidos exitosamente',
    };
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Delete('trash/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.projectService.deleteOne({ _id: id });
  }
}
