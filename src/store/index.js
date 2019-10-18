import Vue from 'vue';
import Vuex from 'vuex';
import posts from './posts';
import user from './user';
import shared from './shared';
import orders from './orders';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { posts, user, shared, orders },
});
