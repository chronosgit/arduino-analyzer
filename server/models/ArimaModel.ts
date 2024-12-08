import mongoose from 'mongoose';
import ArimaSchema from '~/server/schemas/ArimaSchema';

const ArimaModel = mongoose.model('CachedModel', ArimaSchema);

export default ArimaModel;
