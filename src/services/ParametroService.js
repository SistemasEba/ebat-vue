import axios from "axios";

export class ParametroService {
    constructor() {
        this.url = "http://services.ernestoborges.com.br/ebat/parametro/";
        axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    async getById(id) {
        return await axios.get(this.url + "find/" + id);
    }
}