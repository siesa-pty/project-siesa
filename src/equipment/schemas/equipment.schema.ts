/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type EquipmentDocument = HydratedDocument<Equipment>;

@Schema()
export class Equipment {

  @Prop({ type: String, default: () => new ObjectId().toHexString() })
  _id: string;
  
  @Prop({
    type: String,
    unique: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop()
  projectName: string;

  @Prop()
  files: any[];

  @Prop()
  qr: string;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);

EquipmentSchema.pre('save', function(next) {
  this._id = this._id.toString();
  next();
});