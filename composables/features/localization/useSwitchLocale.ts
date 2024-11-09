export default function () {
	const { locale, locales, setLocale } = useI18n();

	const switchLocale = () => {
		const curLocaleInd = locales.value.findIndex(
			(l) => l.code === locale.value,
		);

		const indOfNextLocale =
			curLocaleInd + 1 >= locales.value.length ? 0 : curLocaleInd + 1;

		setLocale(locales.value[indOfNextLocale].code);
	};

	return switchLocale;
}
