import axios from "axios";

export class TipoService {
    constructor() {
        this.url = "http://services.ernestoborges.com.br/ebat/tipo/";
        axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    async getAll() {
        return await axios.get(this.url + "find-all");
    }

    async getType(type) {
        return await axios.get(this.url + "find-type/" + type);
    }

    async getById(id) {
        return await axios.get(this.url + "find/" + id);
    }

    async save(state) {
        return await axios.post(this.url + "save", {
            tipdescri: state.tipdescri,
            tipinform: state.tipinform,
            tipposica: state.tipposica,
        });
    }

    async update(state) {
        return await axios.put(this.url + "update", {
            tipsequen: state.id,
            tipdescri: state.tipdescri,
            tipinform: state.tipinform,
            tipposica: state.tipposica,
        });
    }

    async remove(id) {
        return await axios.delete(this.url + "remove/" + id);
    }
}