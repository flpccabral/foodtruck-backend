import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import { notifyKitchen } from '../app';
import Table from '../models/Table';

export const createOrder = async (req: Request, res: Response) => {
  const { mesa, produtos, total, atendente } = req.body;

  try {
    const newOrder = new Order({ mesa, produtos, total, atendente });
    await newOrder.save();

    // Atualizar o status da mesa para 'occupied'
    await Table.findByIdAndUpdate(mesa, { status: 'occupied' });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('atendente produtos.produto');
    res.json(orders);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('atendente produtos.produto');
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.status = status || order.status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    await Order.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Order removed' });
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server error');
  }
};
