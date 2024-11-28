import isDbConnected from '~/server/utils/isDbConnected';

export default function () {
	if (!isDbConnected()) {
		throw createError({ statusCode: 500, message: "DB isn't connected" });
	}

	return true;
}
