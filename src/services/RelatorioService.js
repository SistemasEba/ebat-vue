import axios from "axios";

export class RelatorioService {
    constructor() {
        this.url = "http://services.ernestoborges.com.br/ebat/relatorio/";
        axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    async getByPeriod(inicio, fim) {
        return await axios.get(this.url + "find/" + inicio + "/" + fim);
    }
}