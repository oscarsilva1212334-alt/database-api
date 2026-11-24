import { ObjectId } from 'mongodb';

export interface Demo {
  _id?: ObjectId;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDemoDto {
  title: string;
  description?: string;
}

export interface UpdateDemoDto {
  title?: string;
  description?: string;
  completed?: boolean;
}
