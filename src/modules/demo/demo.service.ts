import { ObjectId } from 'mongodb';
import { AppError } from '../../shared/errors/AppError';
import { CreateDemoDto, Demo, UpdateDemoDto } from './demo.model';
import { DemoRepository } from './demo.repository';

export class DemoService {
  constructor(private readonly repository: DemoRepository = new DemoRepository()) {}

  private validateId(id: string): void {
    if (!ObjectId.isValid(id)) throw new AppError('ID inválido', 400);
  }

  async getAll(): Promise<Demo[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<Demo> {
    this.validateId(id);
    const item = await this.repository.findById(id);
    if (!item) throw new AppError('Registro no encontrado', 404);
    return item;
  }

  async create(dto: CreateDemoDto): Promise<Demo> {
    const title = dto.title?.trim();
    if (!title) throw new AppError('El título es obligatorio', 400);
    const now = new Date();
    return this.repository.create({
      title,
      description: dto.description?.trim() ?? '',
      completed: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  async update(id: string, dto: UpdateDemoDto): Promise<Demo> {
    this.validateId(id);
    const changes: UpdateDemoDto = {};
    if (dto.title !== undefined) {
      const title = dto.title.trim();
      if (!title) throw new AppError('El título no puede estar vacío', 400);
      changes.title = title;
    }
    if (dto.description !== undefined) changes.description = dto.description.trim();
    if (dto.completed !== undefined) changes.completed = Boolean(dto.completed);

    const updated = await this.repository.update(id, changes);
    if (!updated) throw new AppError('Registro no encontrado', 404);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.validateId(id);
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new AppError('Registro no encontrado', 404);
  }
}
