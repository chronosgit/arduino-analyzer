export default function (target: EventTarget) {
	if (
		target instanceof HTMLInputElement ||
		target instanceof HTMLTextAreaElement ||
		target instanceof HTMLSelectElement ||
		target instanceof HTMLOptionElement
	) {
		return target.value;
	}

	throw createError({
		statusCode: 404,
		message: "Event's target doesn't have a value property",
	});
}
