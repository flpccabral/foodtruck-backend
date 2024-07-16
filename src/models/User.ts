import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  nome: string;
  email: string;
  senha: string;
  tipo: 'atendente' | 'admin';
  criadoEm: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ['atendente', 'admin'], required: true },
  criadoEm: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function (next) {
  const user = this as IUser;

  if (!user.isModified('senha')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.senha, salt);
  user.senha = hash;
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.senha);
};

export default model<IUser>('User', UserSchema);
