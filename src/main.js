import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
/* 全局样式表 */
import "./assets/css/global.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/global.css";
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

import BaiduMap from "vue-baidu-map";

Vue.prototype.$EventBus = new Vue();

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "4GzfdmqBbAI805r09m5m931txne42I6X"
});

import echarts from "echarts";
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
