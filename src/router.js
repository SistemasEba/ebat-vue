import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./views/Login";
import Index from "./views/Index";
import PessoaList from "./views/PessoaList";
import PessoaForm from "./views/PessoaForm";

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
    ]
});