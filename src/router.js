import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./views/Login";
import Index from "./views/Index";

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
    ]
});