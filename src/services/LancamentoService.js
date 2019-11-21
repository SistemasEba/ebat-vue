import axios from "axios";

export class LancamentoService {
    constructor() {
        this.url = "http://services.ernestoborges.com.br/ebat/lancamento/";
        axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    async getAll(data) {
        return await axios.get(this.url + "find-all-date/" + data.toJSON().substring(0, 10));
    }
}