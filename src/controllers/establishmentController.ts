import { Request, Response } from 'express';
import Establishment from '../models/Establishment';

export const createEstablishment = async (req: Request, res: Response) => {
  const { nome, endereco, telefone } = req.body;

  try {
    const establishment = new Establishment({ nome, endereco, telefone });
    await establishment.save();
    res.status(201).json(establishment);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const getEstablishments = async (req: Request, res: Response) => {
  try {
    const establishments = await Establishment.find();
    res.json(establishments);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const getEstablishmentById = async (req: Request, res: Response) => {
  try {
    const establishment = await Establishment.findById(req.params.id);
    if (!establishment) return res.status(404).json({ msg: 'Establishment not found' });
    res.json(establishment);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};
