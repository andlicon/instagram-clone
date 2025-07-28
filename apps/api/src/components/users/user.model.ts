import { Document, Model, Schema, Types, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { IUser } from '@avila-tek/models';

type TStaticMethods = {
  syncToAlgolia(): void;
  setAlgoliaSettings(settings: any): void;
};

export type UserModel = Model<IUser> & TStaticMethods;

export type UserDocument = Document<Types.ObjectId, any, IUser> & IUser;

const userSchema = new Schema<IUser, UserModel, TStaticMethods>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model<IUser, UserModel>('User', userSchema);
export const UserTC = composeMongoose<UserDocument>(User as any);
