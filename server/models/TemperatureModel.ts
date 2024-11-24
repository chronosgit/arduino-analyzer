import mongoose from 'mongoose';
import TemperatureSchema from '../schemas/TemperatureSchema';

export default mongoose.model('Temperature', TemperatureSchema);
