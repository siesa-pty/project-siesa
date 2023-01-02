/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {

  @Prop({ type: String, default: () => new ObjectId().toHexString() })
  _id: string;
  
  @Prop()
  name: string;

  @Prop()
  files: any[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);

CompanySchema.pre('save', function(next) {
  this._id = this._id.toString();
  next();
});