import mongoose from 'mongoose';
import GasSchema from '~/server/schemas/GasSchema';

export default mongoose.model('Gas', GasSchema);
