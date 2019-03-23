import axios from 'axios';

class API {

	url = 'http://localhost:8080';

	headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	};

	headersWithAuthorization = () => ({
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'Authorization': `JWT ${localStorage.getItem('token')}`
	});

	async login(data) {
		return await axios.post(`${this.url}/login`, data, this.headers)
	}

	async register(data) {
		return await axios.post(`${this.url}/register`, data, this.headers)
	}

	async getListOfStations() {
		return await axios.get(`${this.url}/get-list-of-radio-stations`, this.headers)
	}

	async removeStationByID(id) {
		return await axios.delete(`${this.url}/remove-station-by-id/${id}`, { headers: this.headersWithAuthorization() });
	}

	async editStationByID(id, data) {
		return await axios.put(`${this.url}/edit-station-by-id/${id}`, data, {headers : this.headersWithAuthorization() });
	}

	async createStation(data) {
		return await axios.post(`${this.url}/create-new-station`, data, { headers: this.headersWithAuthorization() });
	}

	async addToFavourite(id, admin_ID) {
		return await axios.put(`${this.url}/add-to-favourite/${id}`,
			{ admin_ID },
			{ headers: this.headersWithAuthorization() });
	}

	async findRadioAutocomplete(name) {
		return await axios.get(`${this.url}/station-autocomplete/${name}`, this.headers)
	}

}

export default new API();