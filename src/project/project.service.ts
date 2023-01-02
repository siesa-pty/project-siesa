import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const createdProject = await this.projectModel.create(createProjectDto);
      return createdProject;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async uploadFile(fileName: string) {
    try {
      return fileName;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAll(): Promise<Project[]> {
    try {
      return this.projectModel.find().exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findOne(id: string): Promise<Project> {
    try {
      return this.projectModel.findOne({ _id: id });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteOne(query: any): Promise<void> {
    try {
      await this.projectModel.deleteOne(query).exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
