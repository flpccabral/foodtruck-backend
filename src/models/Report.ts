import { Schema, model, Document } from 'mongoose';

interface IReport extends Document {
  tipo: 'financeiro' | 'estoque' | 'vendas';
  periodo: { inicio: Date; fim: Date };
  dados: object;
  criadoEm: Date;
}

const ReportSchema = new Schema<IReport>({
  tipo: { type: String, enum: ['financeiro', 'estoque', 'vendas'], required: true },
  periodo: {
    inicio: { type: Date, required: true },
    fim: { type: Date, required: true }
  },
  dados: { type: Object, required: true },
  criadoEm: { type: Date, default: Date.now }
});

export default model<IReport>('Report', ReportSchema);
