import { Request, Response } from 'express';
import Product from '../models/Product';

export const createProduct = async (req: Request, res: Response) => {
  const { nome, descricao, preco, categoria, estoque, estabelecimento } = req.body;

  try {
    const product = new Product({ nome, descricao, preco, categoria, estoque, estabelecimento });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('categoria');
    res.json(products);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('categoria');
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { nome, descricao, preco, categoria, estoque } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    product.nome = nome || product.nome;
    product.descricao = descricao || product.descricao;
    product.preco = preco || product.preco;
    product.categoria = categoria || product.categoria;
    product.estoque = estoque || product.estoque;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};
