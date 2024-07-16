import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database';
import { ENV } from './config/env';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import reportRoutes from './routes/reportRoutes';
import establishmentRoutes from './routes/establishmentRoutes';
import tableRoutes from './routes/tableRoutes';
import { IOrder } from './models/Order';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

connectDB();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/establishments', establishmentRoutes);
app.use('/api/tables', tableRoutes); // Adiciona as rotas de mesas

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// WebSocket para notificar a cozinha
io.on('connection', (socket) => {
  console.log('a user connected');
});

export const notifyKitchen = (order: IOrder) => {
  io.emit('new_order', order);
};
