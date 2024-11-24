import mongoose from 'mongoose';

// eslint-disable-next-line
let isDbConnected: any = null;

const connectDb = async () => {
	if (isDbConnected) return;

	try {
		const { MONGODB_URI } = useRuntimeConfig();

		await mongoose.connect(MONGODB_URI);

		isDbConnected = true;
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('Failed to connect to MongoDB:', err);
	}
};

export default defineNitroPlugin(async () => {
	await connectDb();
});
