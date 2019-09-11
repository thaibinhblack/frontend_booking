import Vue from 'vue';
import Vuetify ,{
  VTextField
} from 'vuetify/lib';

Vue.use(Vuetify, {
  component: {
    VTextField
  }
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
