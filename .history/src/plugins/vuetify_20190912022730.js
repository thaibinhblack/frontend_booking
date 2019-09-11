import Vue from 'vue';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import Vuetify ,{
  VTextField
} from 'vuetify/lib';
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  component: {
    VTextField
  },
  directives: {
    Ripple,
  },
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
