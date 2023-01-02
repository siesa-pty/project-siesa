import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const createdCompany = await this.companyModel.create(createCompanyDto);
      return createdCompany;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findAll(): Promise<Company[]> {
    try {
      return this.companyModel.find().exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteOne(query: any): Promise<void> {
    try {
      await this.companyModel.deleteOne(query).exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
