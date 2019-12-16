<template>
  <v-content>
    Oii
  </v-content>
</template>

<script>
import { TipoService } from "../services/TipoService";
import { NucleoService } from "../services/NucleoService";
import { PessoaService } from "../services/PessoaService";
import { ProjetoService } from "../services/ProjetoService";

export default {
  data() {
    return {
      id: "",
      data: new Date(), 
      titulo: "",
      tipo: "",
      nucleco: "",
      solicitante: "",
      responsavel: "",
      descricao: "",
      tipos: [],
      nucleos: [],
      solicitantes: [],
      responsaveis: [],
      tipoService: new TipoService(),
      nucleoService: new NucleoService(),
      pessoaService: new PessoaService(),
      projetoService: new ProjetoService()
    };
  },
  methods: {
    getById: async function() {
      await this.projetoService
        .getById(this.id)
        .then(response => {
          this.data = new Date(response.data.pjtdatsol);
          this.titulo = response.data.pjttitulo;
          this.tipo = response.data.pjttipseq;
          this.nucleco = response.data.pjtnucseq;
          this.solicitante = response.data.pjtsolseq;
          this.responsavel = response.data.pjtdevseq;
          this.descricao = response.data.pjtdescri;
        })
        .cath(error => alert(error));
    }
  }
};
</script>