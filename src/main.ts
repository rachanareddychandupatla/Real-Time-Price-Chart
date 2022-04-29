import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/styles.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faXmark,
  faTrashCan,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueApexCharts from "vue-apexcharts";
import axios from "axios";
import VueAxios from "vue-axios";
import HighchartsVue from "highcharts-vue";

Vue.use(VueAxios, axios);
Vue.use(HighchartsVue);

Vue.config.productionTip = false;

library.add(faEdit, faXmark, faTrashCan, faCheck);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

