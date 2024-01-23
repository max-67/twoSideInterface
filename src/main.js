import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';
Vue.config.productionTip = false

import Main from './components/Main.vue';
import PersonInfo from './components/PersonInfo.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/person/:id', component: PersonInfo },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    clients: null
  },
  getters: {
    clients: state => state.clients
  },
  mutations: {
    setClients(state, clients) {
      state.clients = clients;
    }
  },
  actions: {
    saveClient(context, client) {
      const clientCopy = JSON.parse(JSON.stringify(client));
      if (clientCopy.id == null) {
        clientCopy.id = context.state.clients.toSorted((a, b) => a.id < b.id ? 1 : -1)[0].id + 1;
      }

      clientCopy.created_at = new Date();

      const additionalClients = JSON.parse(localStorage.getItem('additionalClients'));
      if (additionalClients == null) {
        localStorage.setItem('additionalClients', JSON.stringify([clientCopy]));
      } else {
        additionalClients.push(clientCopy);
        localStorage.setItem('additionalClients', JSON.stringify(additionalClients));
      }

      context.state.clients.push(clientCopy);
    },
    async getClients() {
      const response = await axios.get('clients.json');

      const additionalClients = JSON.parse(localStorage.getItem('additionalClients'));
      if (additionalClients != null) {
        response.data = response.data.concat(additionalClients);
      }

      this.commit('setClients', response.data);
    },
    removeClient(context, id) {
      const clientsRemoved = context.getters.clients.filter((i) => i.id != id);
      this.commit('setClients', clientsRemoved);

      const additionalClients = JSON.parse(localStorage.getItem('additionalClients'));
      if (additionalClients != null) {
        const clientIndex = additionalClients.findIndex((i) => i.id == id);
        if (clientIndex != -1) {
          additionalClients.splice(clientIndex, 1);
          localStorage.setItem('additionalClients', JSON.stringify(additionalClients));
        }
      }
    }
  }
});

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
