import axios from "axios";

export class EtapaService {
    constructor() {
        this.url = "http://services.ernestoborges.com.br/ebat/etapa/";
        axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    async getAll() {
        return await axios.get(this.url + "find-all");
    }

    async getById(id) {
        return await axios.get(this.url + "find/" + id);
    }

    async getByProjeto(id) {
        return await axios.get(this.url + "find-all-projeto/" + id);
    }

    async save(state) {
        return await axios.post(this.url + "save", {
            etpdescri: state.etpdescri,
            etpdatini: state.etpdatini.toJSON().substring(0, 10),
            etphrspre: state.etphrspre,
            etphrstot: state.etphrstot,
            etppjtseq: state.etppjtseq,
            etpnucseq: state.etpnucseq,
            etptipseq: state.etptipseq,
            etppesseq: state.etppesseq,
            etpsolseq: state.etpsolseq
        });
    }

    async update(state) {
        return await axios.put(this.url + "update", {
            etpsequen: state.id,
            etpdatini: state.etpdatini.toJSON().substring(0, 10),
            etpdatfin: state.etpdatfin.toJSON().substring(0, 10),
            etphrspre: state.etphrspre,
            etpdescri: state.etpdescri,
            etphrstot: state.etphrstot,
            etppjtseq: state.etppjtseq,
            etpnucseq: state.etpnucseq,
            etptipseq: state.etptipseq,
            etppesseq: state.etppesseq,
            etpsolseq: state.etpsolseq
        });
    }

    async finalizar(id) {
        return await axios.put(this.url + "finalizar/" + id);
    }

    async remove(id) {
        return await axios.delete(this.url + "remove/" + id);
    }
}