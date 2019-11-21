import axios from "axios";

export class ProjetoService {
    constructor() {
        this.url = "http://services.ernestoborges.com.br/ebat/projeto/";
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
            pjttitulo: state.pjttitulo,
            pjtdescri: state.pjttitulo,
            pjtdatsol: state.pjtdatsol.toJSON().substring(0, 10),
            pjttipseq: state.pjttipseq,
            pjtnucseq: state.pjtnucseq,
            pjtsolseq: state.pjtsolseq,
            pjtdevseq: state.pjtdevseq
        });
    }

    async update(state) {
        return await axios.put(this.url + "update", {
            pjtsequen: state.id,
            pjttitulo: state.pjttitulo,
            pjtdescri: state.pjtdescri,
            pjtdatsol: state.pjtdatsol.toJSON().substring(0, 10),
            pjttipseq: state.pjttipseq,
            pjtnucseq: state.pjtnucseq,
            pjtsolseq: state.pjtsolseq,
            pjtdevseq: state.pjtdevseq
        });
    }

    async remove(id) {
        return await axios.delete(this.url + "remove/" + id);
    }
}