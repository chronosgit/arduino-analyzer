export default function (text: string) {
	if (typeof text !== 'string') throw createError('Text must be a string');

	if (!text) return '';

	return text[0].toUpperCase() + text.slice(1);
}
