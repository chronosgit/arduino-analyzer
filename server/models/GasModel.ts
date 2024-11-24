import mongoose from 'mongoose';
import GasSchema from '../schemas/GasSchema';

export default mongoose.model('Gas', GasSchema);
