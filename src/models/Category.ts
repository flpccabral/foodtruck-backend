import { Schema, model, Document } from 'mongoose';

interface ICategory extends Document {
  nome: string;
}

const CategorySchema = new Schema<ICategory>({
  nome: { type: String, required: true },
});

export default model<ICategory>('Category', CategorySchema);
