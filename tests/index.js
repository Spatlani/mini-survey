import Vue from "vue";
import Vuetify from "vuetify";
import Draggable from 'vuedraggable';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.component('draggable', Draggable);