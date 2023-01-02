import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const createdCategory = await this.categoryModel.create(
        createCategoryDto,
      );
      return createdCategory;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return this.categoryModel.find().exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteOne(query: any): Promise<void> {
    try {
      await this.categoryModel.deleteOne(query).exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
