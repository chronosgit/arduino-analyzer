// eslint-disable-next-line
class TemperatureService {
	static async getTemperatureInCelcius() {
		return $fetch('/api/mock/temperature');
	}
}

export default TemperatureService;
