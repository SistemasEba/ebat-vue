<template>
  <v-content>
    <v-container fluid>
      <v-row justify="end">
        <v-col cols="12" sm="6" md="4" lg="2">
          <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="date" label="Mês" outlined prepend-icon="mdi-calendar" dense v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" type="month" scrollable color="orange" locale="pt-br">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancelar</v-btn>
              <v-btn text color="primary" @click="selectMonth($refs.dialog, date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>

      <v-simple-table class="elevation-2">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Nomes</th>
              <th class="text-left">Segunda-Feira</th>
              <th class="text-left">Terça-Feira</th>
              <th class="text-left">Quarta-Feira</th>
              <th class="text-left">Quinta-Feira</th>
              <th class="text-left">Sexta-Feira</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pessoas" :key="item.pessequen">
              <td>({{item.peshrsaid}}) - {{ item.pesdescri }}</td>
              <td>
                <div v-for="estrela in item.seg" :key="estrela.toString()">
                  <v-icon
                    class="Fs30"
                    color="orange"
                    :title="estrela.toLocaleDateString().toString()"
                  >mdi-star</v-icon>
                </div>
              </td>
              <td>
                <div v-for="estrela in item.ter" :key="estrela.toString()">
                  <v-icon
                    class="Fs30"
                    color="orange"
                    :title="estrela.toLocaleDateString().toString()"
                  >mdi-star</v-icon>
                </div>
              </td>
              <td>
                <div v-for="estrela in item.qua" :key="estrela.toString()">
                  <v-icon
                    class="Fs30"
                    color="orange"
                    :title="estrela.toLocaleDateString().toString()"
                  >mdi-star</v-icon>
                </div>
              </td>
              <td>
                <div v-for="estrela in item.qui" :key="estrela.toString()">
                  <v-icon
                    class="Fs30"
                    color="orange"
                    :title="estrela.toLocaleDateString().toString()"
                  >mdi-star</v-icon>
                </div>
              </td>
              <td>
                <div v-for="estrela in item.sex" :key="estrela.toString()">
                  <v-icon
                    class="Fs30"
                    color="orange"
                    :title="estrela.toLocaleDateString().toString()"
                  >mdi-star</v-icon>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-content>
</template>

<script>
import { PessoaService } from "../services/PessoaService";
import { LancamentoService } from "../services/LancamentoService";
export default {
  data() {
    return {
      modal: false,
      data: new Date(),
      date: new Date().toISOString().substr(0, 7),
      pessoas: [],
      lancamentos: [],
      pessoaService: new PessoaService(),
      lancamentoService: new LancamentoService()
    };
  },
  async mounted() {
    await this.parseStars();
  },
  methods: {
    getUsers: async function() {
      await this.pessoaService
        .getAllUsers()
        .then(response => {
          response.data.forEach(element => {
            element.pesdescri = element.pesdescri.substr(
              0,
              element.pesdescri.indexOf(" ") + 1
            );
            element.seg = [];
            element.ter = [];
            element.qua = [];
            element.qui = [];
            element.sex = [];
          });
          this.pessoas = response.data;
        })
        .catch(error => alert(error));
    },
    getStars: async function() {
      await this.lancamentoService
        .getAll(this.data)
        .then(response => (this.lancamentos = response.data))
        .catch(error => alert(error));
    },
    getWeekDay: function(d) {
      let semana = [1, 2, 3, 4, 5, 6, 7];
      return semana[d.getDay()];
    },
    parseStars: async function() {
      await this.getUsers();
      await this.getStars();

      this.pessoas.forEach(pessoa => {
        this.lancamentos.forEach(estrela => {
          if (pessoa.pessiglaa === estrela.lanpesseq.pessiglaa) {
            let data = new Date(estrela.lancaddat);
            data.setDate(data.getDate() + 1);
            let diaSemana = this.getWeekDay(data);

            switch (diaSemana) {
              case 2:
                pessoa.seg.push(data);
                break;
              case 3:
                pessoa.ter.push(data);
                break;
              case 4:
                pessoa.qua.push(data);
                break;
              case 5:
                pessoa.qui.push(data);
                break;
              default:
                pessoa.sex.push(data);
                break;
            }
          }
        });
      });
    },
    selectMonth: function(mod, date) {
      this.data = new Date(this.date);
      this.parseStars();
      this.modal = false;
      mod.save(date);
    }
  }
};
</script>