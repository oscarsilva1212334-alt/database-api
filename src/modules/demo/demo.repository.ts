import { Collection, ObjectId } from 'mongodb';
import { getDb } from '../../config/database';
import { Demo, UpdateDemoDto } from './demo.model';

export class DemoRepository {
  private get collection(): Collection<Demo> {
    return getDb().collection<Demo>('demos');
  }

  async findAll(): Promise<Demo[]> {
    return this.collection.find().sort({ createdAt: -1 }).toArray();
  }

  async findById(id: string): Promise<Demo | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async create(data: Omit<Demo, '_id'>): Promise<Demo> {
    const result = await this.collection.insertOne(data as Demo);
    return { ...data, _id: result.insertedId };
  }

  async update(id: string, data: UpdateDemoDto): Promise<Demo | null> {
    return this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}
