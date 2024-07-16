import { Schema, model, Document } from 'mongoose';

interface ITable extends Document {
  numero: number;
  status: 'occupied' | 'free';
}

const TableSchema = new Schema<ITable>({
  numero: { type: Number, required: true, unique: true },
  status: { type: String, enum: ['occupied', 'free'], default: 'free' },
});

export default model<ITable>('Table', TableSchema);
