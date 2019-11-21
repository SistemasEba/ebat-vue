import axios from "axios";

export class NucleoService {
    constructor() {
        this.url = "http://services.ernestoborges.com.br/ebat/nucleo/";
        axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    async getAll() {
        return await axios.get(this.url + "find-all");
    }

    async getById(id) {
        return await axios.get(this.url + "find/" + id);
    }

    async save(state) {
        return await axios.post(this.url + "save", {
            nucsiglaa: state.nucsiglaa,
            nucdescri: state.nucdescri,
            nucgesseq: state.nucgesseq
        });
    }

    async update(state) {
        return await axios.put(this.url + "update", {
            nucsequen: state.id,
            nucsiglaa: state.nucsiglaa,
            nucdescri: state.nucdescri,
            nucgesseq: state.nucgesseq
        });
    }

    async remove(id) {
        return await axios.delete(this.url + "remove/" + id);
    }
}