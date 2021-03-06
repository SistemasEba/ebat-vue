import qs from 'qs';
import axios from "axios";

export class PessoaService {
    constructor() {
        this.url = "http://services.ernestoborges.com.br/ebat/pessoa/";
        axios.defaults.headers.post['Accept'] = 'application/json';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    async autenticar(sigla, senha) {
        return await axios({
            method: 'POST',
            url: this.url + "login",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                sigla: sigla,
                senha: senha
            })
        });
    }

    async mudarCredenciais(senha, id) {
        return await axios.post(this.url + "credenciais?senha=" + senha + "&id=" + id);
    }

    async getByPerfil(perfil) {
        return await axios.get(this.url + "find-perfil/" + perfil);
    }

    async getAll() {
        return await axios.get(this.url + "find-all");
    }

    async getAllUsers() {
        return await axios.get(this.url + "find-all-users");
    }

    async getById(id) {
        return await axios.get(this.url + "find/" + id);
    }

    async save(state) {
        return await axios.post(this.url + "save", {
            pesdescri: state.pesdescri,
            pessiglaa: state.pessiglaa,
            pesssenha: state.pesssenha,
            pesperfil: state.pesperfil,
            pesferias: state.pesferias,
            pesnucseq: state.pesnucseq,
            peshrsaid: state.peshrsaid
        });
    }

    async update(state) {
        return await axios.put(this.url + "update", {
            pessequen: state.pessequen,
            pesdescri: state.pesdescri,
            pessiglaa: state.pessiglaa,
            pesperfil: state.pesperfil,
            pesferias: state.pesferias,
            pesnucseq: state.pesnucseq,
            peshrsaid: state.peshrsaid
        });
    }

    async remove(id) {
        return await axios.delete(this.url + "remove/" + id);
    }

    async changePhoto(idUser, image) {
        let endpoint = this.url + "change-photo?id=" + idUser;
        let formData = new FormData();

        formData.append("file", image);

        await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}