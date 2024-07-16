import { Request, Response } from 'express';
import Table from '../models/Table';

export const getTables = async (req: Request, res: Response) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const createTable = async (req: Request, res: Response) => {
  const { numero } = req.body;

  try {
    const table = new Table({ numero });
    await table.save();
    res.status(201).json(table);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const updateTableStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const table = await Table.findByIdAndUpdate(id, { status }, { new: true });
    if (!table) {
      return res.status(404).json({ msg: 'Table not found' });
    }
    res.json(table);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};
