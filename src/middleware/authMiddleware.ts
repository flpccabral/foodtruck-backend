import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  try {
    const decoded: any = jwt.verify(token, ENV.JWT_SECRET);
    req.user = await User.findById(decoded.user.id).select('-senha');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
