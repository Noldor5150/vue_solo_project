import * as firebase from 'firebase';

class Order {
  constructor(name, phone, postId, done = false, id = null) {
    this.name = name;
    this.phone = phone;
    this.postId = postId;
    this.done = done;
    this.id = id;
  }
}

export default {
  state: {
    orders: [],
  },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload;
    },
  },
  actions: {
    async createOrder({ commit }, { name, phone, postId, ownersId }) {
      const order = new Order(name, phone, postId);
      commit('clearError');
      try {
        firebase
          .database()
          .ref(`/users/${ownersId}/orders`)
          .push(order);
      } catch (error) {
        commit('setError', error.message);
        throw error;
      }
    },
    async fetchOrders({ commit, getters }) {
      commit('setLoading', true);
      commit('clearError');

      const resultOrders = [];
      try {
        const firebaseValue = await firebase
          .database()
          .ref(`/users/${getters.user.id}/orders`)
          .once('value');
        const orders = firebaseValue.val();

        Object.keys(orders).forEach(key => {
          const order = orders[key];
          resultOrders.push(new Order(order.name, order.phone, order.postId, order.done, key));
        });
        commit('loadOrders', resultOrders);
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    async markOrderDone({ commit, getters }, payload) {
      commit('clearError');
      try {
        await firebase
          .database()
          .ref(`/users/${getters.user.id}/orders`)
          .child(payload)
          .update({
            done: true,
          });
      } catch (error) {
        commit('setError', error.message);
        throw error;
      }
    },
  },
  getters: {
    doneOrders(state) {
      return state.orders.filter(order => order.done);
    },
    undoneOrders(state) {
      return state.orders.filter(order => !order.done);
    },

    orders(state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders);
    },
  },
};
