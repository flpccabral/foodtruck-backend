import { Schema, model, Document } from 'mongoose';

interface IEstablishment extends Document {
  nome: string;
  endereco: string;
  telefone?: string;
  criadoEm: Date;
}

const EstablishmentSchema = new Schema<IEstablishment>({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  telefone: { type: String },
  criadoEm: { type: Date, default: Date.now }
});

export default model<IEstablishment>('Establishment', EstablishmentSchema);
