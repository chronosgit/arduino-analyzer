// eslint-disable-next-line
class GasService {
	static async getGasDensity() {
		return $fetch('/api/mock/gas');
	}
}

export default GasService;
