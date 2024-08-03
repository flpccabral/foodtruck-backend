import { Schema, model, Document, Types } from 'mongoose';
import Product from './Product';

export interface IOrder extends Document {
  mesa: Schema.Types.ObjectId;
  cliente: string;
  observacoes: string;
  quantidadePessoas: number;
  itens: Array<{ produto: Types.ObjectId; quantidade: number }>;
  total: number;
  status: 'pendente' | 'preparando' | 'finalizado' | 'entregue' | 'cancelado';
  atendente: Types.ObjectId;
  criadoEm: Date;
  atualizarEstoque(): Promise<void>;
}

const OrderSchema = new Schema<IOrder>({
  mesa: { type: Schema.Types.ObjectId, ref: 'Mesa', required: true },
  cliente: { type: String },
  observacoes: { type: String },
  quantidadePessoas: { type: Number, default: 1 },
  itens: [
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
  for (const item of this.itens) {
    const produto = await Product.findById(item.produto);
    if (produto) {
      produto.estoque -= item.quantidade;
      await produto.save();
    }
  }
};

export default model<IOrder>('Order', OrderSchema);
