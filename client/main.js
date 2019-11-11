import Vue from "vue";                      // Фрэймворк приложения
import router from "./routes/router";       // Маршрутизация внутри приложения
import VueCookies from "vue-cookies";       // Плагин для работы с cookies
import "./assets/styles/common.sass";       // Набор стилей для приложения
import App from "./app.vue";                // Основной компанент шаблона приложения
import { i18n } from "./plugins/i18n.js";   // Плагин для локализации приложения


Vue.use(VueCookies);

new Vue({
    el: "#app",
    router,
    i18n,
    render: (h) => h(App)
});
