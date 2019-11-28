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
import Dashboard from "./views/Dashboard";
import Relatorio from "./views/Relatorio";

export default new Router({ 
    linkExactActiveClass: "active",
    routes: [
        {
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
            path: "/restrito/projeto",
            name: "ProjetoList",
            components: {
                header: Header,
                default: ProjetoList,
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
    ]
});