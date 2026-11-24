import { Request, Response } from 'express';
import { DemoService } from './demo.service';

export class DemoController {
  constructor(private readonly service: DemoService = new DemoService()) {}

  getAll = async (_req: Request, res: Response) => {
    const data = await this.service.getAll();
    res.json({ ok: true, data });
  };

  getById = async (req: Request, res: Response) => {
    const data = await this.service.getById(req.params.id);
    res.json({ ok: true, data });
  };

  create = async (req: Request, res: Response) => {
    const data = await this.service.create(req.body);
    res.status(201).json({ ok: true, data });
  };

  update = async (req: Request, res: Response) => {
    const data = await this.service.update(req.params.id, req.body);
    res.json({ ok: true, data });
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(req.params.id);
    res.status(204).send();
  };
}
