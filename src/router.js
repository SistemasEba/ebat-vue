import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./views/Login";
import Index from "./views/Index";
import PessoaList from "./views/PessoaList";
import PessoaForm from "./views/PessoaForm";
import ProjetoList from "./views/ProjetoList";
import ProjetoForm from "./views/ProjetoForm";
import NucleoForm from "./views/NucleoForm";
import NucleoList from "./views/NucleoList";
import TipoForm from "./views/TipoForm";
import TipoList from "./views/TipoList";
import AndamentoForm from "./views/AndamentoForm";
import AndamentoList from "./views/AndamentoList";
import EtapaForm from "./views/EtapaForm";
import EtapaList from "./views/EtapaList";
import Dashboard from "./views/Dashboard";
import Relatorio from "./views/Relatorio";
import Lancamento from "./views/Lancamento";

export default new Router({
    history,
    linkExactActiveClass: "active",
    routes: [{
            path: "/",
            name: "Login",
            components: {
                default: Login,
            }
        },
        {
            path: "/restrito/index",
            name: "Index",
            components: {
                header: Header,
                default: Index,
                footer: Footer
            }
        },
        {
            path: "/restrito/pessoa",
            name: "PessoaList",
            components: {
                header: Header,
                default: PessoaList,
                footer: Footer
            }
        },
        {
            path: "/restrito/pessoa/form/:id",
            name: "PessoaFormEx",
            components: {
                header: Header,
                default: PessoaForm,
                footer: Footer
            }
        },
        {
            path: "/restrito/pessoa/form",
            name: "PessoaForm",
            components: {
                header: Header,
                default: PessoaForm,
                footer: Footer
            }
        },
        {
            path: "/restrito/nucleo",
            name: "NucleoList",
            components: {
                header: Header,
                default: NucleoList,
                footer: Footer
            }
        },
        {
            path: "/restrito/nucleo/form/:id",
            name: "NucleoFormEx",
            components: {
                header: Header,
                default: NucleoForm,
                footer: Footer
            }
        },
        {
            path: "/restrito/nucleo/form",
            name: "NucleoForm",
            components: {
                header: Header,
                default: NucleoForm,
                footer: Footer
            }
        },
        {
            path: "/restrito/tipo",
            name: "TipoList",
            components: {
                header: Header,
                default: TipoList,
                footer: Footer
            }
        },
        {
            path: "/restrito/tipo/form/:id",
            name: "TipoFormEx",
            components: {
                header: Header,
                default: TipoForm,
                footer: Footer
            }
        },
        {
            path: "/restrito/tipo/form",
            name: "TipoForm",
            components: {
                header: Header,
                default: TipoForm,
                footer: Footer
            }
        },
        {
            path: "/restrito/etapa/:projeto",
            name: "EtapaList",
            components: {
                header: Header,
                default: EtapaList,
                footer: Footer
            }
        },
        {
            path: "/restrito/etapa/:projeto/form/:id",
            name: "EtapaFormEx",
            components: {
                header: Header,
                default: EtapaForm,
                footer: Footer
            }
        },
        {
            path: "/restrito/etapa/:projeto/form",
            name: "EtapaForm",
            components: {
                header: Header,
                default: EtapaForm,
                footer: Footer
            }
        },
        {
            path: "/restrito/andamento/:projeto/:etapa",
            name: "AndamentoList",
            components: {
                header: Header,
                default: AndamentoList,
                footer: Footer
            }
        },
        {
            path: "/restrito/andamento/:projeto/:etapa/form/:id",
            name: "AndamentoFormEx",
            components: {
                header: Header,
                default: AndamentoForm,
                footer: Footer
            }
        },
        {
            path: "/restrito/andamento/:projeto/:etapa/form",
            name: "AndamentoForm",
            components: {
                header: Header,
                default: AndamentoForm,
                footer: Footer
            }
        },
        {
            path: "/restrito/projeto",
            name: "ProjetoList",
            components: {
                header: Header,
                default: ProjetoList,
                footer: Footer
            }
        },
        {
            path: "/restrito/projeto/form/:id",
            name: "ProjetoFormEx",
            components: {
                header: Header,
                default: ProjetoForm,
                footer: Footer
            }
        },
        {
            path: "/restrito/projeto/form",
            name: "ProjetoForm",
            components: {
                header: Header,
                default: ProjetoForm,
                footer: Footer
            }
        },
        {
            path: "/restrito/relatorio",
            name: "Relatorio",
            components: {
                header: Header,
                default: Relatorio,
                footer: Footer
            }
        },
        {
            path: "/restrito/dashboard",
            name: "Dashboard",
            components: {
                header: Header,
                default: Dashboard,
                footer: Footer
            }
        },
        {
            path: "/restrito/lancamento",
            name: "Lancamento",
            components: {
                header: Header,
                default: Lancamento,
                footer: Footer
            }
        },
    ]
});