import { Injectable } from '@nestjs/common';
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
    const createdProject = await this.projectModel.create(createProjectDto);
    return createdProject;
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }
}
