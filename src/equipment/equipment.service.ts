import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { Equipment, EquipmentDocument } from './schemas/equipment.schema';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment.name)
    private readonly equipmentModel: Model<EquipmentDocument>,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto) {
    try {
      const createdEquipment = await this.equipmentModel.create(
        createEquipmentDto,
      );
      return createdEquipment;
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

  async findAll(): Promise<Equipment[]> {
    try {
      return this.equipmentModel.find().exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findOne(id: string): Promise<Equipment> {
    try {
      return this.equipmentModel.findOne({ _id: id });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findProjects(projectName: string): Promise<Equipment[]> {
    try {
      return this.equipmentModel.find({ projectName });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deleteOne(query: any): Promise<void> {
    try {
      await this.equipmentModel.deleteOne(query).exec();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
