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
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { Equipment } from './schemas/equipment.schema';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}
  arr: string[] = [];
  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentService.create(createEquipmentDto);
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
        destination: '../frontend/src/assets/equipment',
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
  async findAll(): Promise<Equipment[]> {
    return this.equipmentService.findAll();
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string): Promise<Equipment> {
    return this.equipmentService.findOne(id);
  }

  @Post('find/project')
  async findCompanies(@Body('projectName') projectName: string): Promise<Equipment[]> {
    return this.equipmentService.findProjects(projectName);
  }

  @Delete('trash/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.equipmentService.deleteOne({ _id: id });
  }
}
