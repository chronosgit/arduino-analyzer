import mongoose from 'mongoose';

export default function () {
	return mongoose.connection.readyState === 1;
}
