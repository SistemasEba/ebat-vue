import axios from "axios";

export class AndamentoService {
    constructor() {
        this.url = "http://services.ernestoborges.com.br/ebat/andamento/";
        axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    async getAll() {
        return await axios.get(this.url + "find-all");
    }

    async getReports(dtInicial, dtFinal) {
        return await axios.get(this.url + "find-report/" + dtInicial + "/" + dtFinal);
    }

    async getAllByEtapa(etapa) {
        return await axios.get(this.url + "find-all-etapa/" + etapa);
    }

    async getById(id) {
        return await axios.get(this.url + "find/" + id);
    }

    async save(state) {
        return await axios.post(this.url + "save", {
            anddatand: state.anddatand,
            andhorass: state.andhorass,
            anddescri: state.anddescri,
            andetpseq: state.andetpseq,
            andtipseq: state.andtipseq,
            andresseq: state.andresseq
        });
    }

    async update(state) {
        return await axios.put(this.url + "update", {
            andsequen: state.id,
            anddatand: state.anddatand,
            andhorass: state.andhorass,
            anddescri: state.anddescri,
            andetpseq: state.andetpseq,
            andtipseq: state.andtipseq,
            andresseq: state.andresseq
        });
    }

    async remove(id) {
        return await axios.delete(this.url + "remove/" + id);
    }
}