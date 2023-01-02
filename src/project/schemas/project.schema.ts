/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {

  @Prop({ type: String, default: () => new ObjectId().toHexString() })
  _id: string;
  
  @Prop()
  name: string;

  @Prop()
  descriptionProject: string;

  @Prop()
  category: string;

  @Prop()
  branchOffice: string;

  @Prop()
  equipmentName: string;

  @Prop()
  description: string;

  @Prop()
  files: any[];

  @Prop()
  qr: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.pre('save', function(next) {
  this._id = this._id.toString();
  next();
});