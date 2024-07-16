import { Schema, model, Document } from 'mongoose';

interface ITable extends Document {
  numero: number;
}

const TableSchema = new Schema<ITable>({
  numero: { type: Number, required: true, unique: true },
});

export default model<ITable>('Table', TableSchema);
