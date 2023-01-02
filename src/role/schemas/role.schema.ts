/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {

  @Prop({ type: String, default: () => new ObjectId().toHexString() })
  _id: string;
  
  @Prop()
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.pre('save', function(next) {
  this._id = this._id.toString();
  next();
});