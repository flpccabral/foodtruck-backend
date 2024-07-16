import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  estabelecimento: Schema.Types.ObjectId;
  criadoEm: Date;
}

const ProductSchema = new Schema<IProduct>({
  nome: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true },
  estoque: { type: Number, required: true },
  estabelecimento: { type: Schema.Types.ObjectId, ref: 'Establishment', required: true },
  criadoEm: { type: Date, default: Date.now }
});

export default model<IProduct>('Product', ProductSchema);
