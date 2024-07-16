import { Request, Response } from 'express';
import Category from '../models/Category';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { nome } = req.body;

  try {
    const newCategory = new Category({ nome });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
