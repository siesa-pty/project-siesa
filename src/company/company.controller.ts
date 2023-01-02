import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { v4 as uuid } from 'uuid';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Company } from './schemas/company.schema';

@Controller('company')
export class CompanyController {
  arr: string[] = [];
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 1, {
      limits: {
        fileSize: 500000,
      },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'image/svg+xml',
          'image/webp',
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      storage: diskStorage({
        destination: '../frontend/src/assets/company',
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
      msg: 'Archivo subido exitosamente',
    };
  }

  @Get('all')
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Delete('trash/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.companyService.deleteOne({ _id: id });
  }
}
