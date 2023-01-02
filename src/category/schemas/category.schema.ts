/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {

  @Prop({ type: String, default: () => new ObjectId().toHexString() })
  _id: string;
  
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('save', function(next) {
  this._id = this._id.toString();
  next();
});