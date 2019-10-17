import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import * as firebase from 'firebase';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBQQOHR_qrT0_Y30ivrsP5abuy4wsuub3U',
      authDomain: 'vue-solo.firebaseapp.com',
      databaseURL: 'https://vue-solo.firebaseio.com',
      projectId: 'vue-solo',
      storageBucket: 'vue-solo.appspot.com',
      messagingSenderId: '526218657229',
      appId: '1:526218657229:web:6150b548a16235cc6e5884',
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('userAutoLogin', user);
      }
    });
    this.$store.dispatch('fetchPosts');
  },
}).$mount('#app');
