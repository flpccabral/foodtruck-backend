import { Schema, model, Document, Types } from 'mongoose';
import Product from './Product';

export interface IOrder extends Document {
  mesa: Schema.Types.ObjectId;
  produtos: Array<{ produto: Types.ObjectId; quantidade: number }>;
  total: number;
  status: 'pendente' | 'preparando' | 'pronto' | 'entregue';
  atendente: Types.ObjectId;
  criadoEm: Date;
  atualizarEstoque(): Promise<void>;
}

const OrderSchema = new Schema<IOrder>({
  mesa: { type: Schema.Types.ObjectId, ref: 'Table', required: true },
  produtos: [
    {
      produto: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantidade: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pendente', 'preparando', 'pronto', 'entregue'], default: 'pendente' },
  atendente: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  criadoEm: { type: Date, default: Date.now }
});

OrderSchema.methods.atualizarEstoque = async function () {
  for (const item of this.produtos) {
    const produto = await Product.findById(item.produto);
    if (produto) {
      produto.estoque -= item.quantidade;
      await produto.save();
    }
  }
};

export default model<IOrder>('Order', OrderSchema);
