import * as firebase from 'firebase';

class Post {
  constructor(title, description, ownersId, imgSrc = '', promo = false, id = null) {
    this.title = title;
    this.description = description;
    this.ownersId = ownersId;
    this.imgSrc = imgSrc;
    this.promo = promo;
    this.id = id;
  }
}

export default {
  state: {
    posts: [],
  },
  mutations: {
    createPost(state, payload) {
      state.posts.push(payload);
    },
    loadPosts(state, payload) {
      state.posts = payload;
    },
    updatePost(state, { title, description, id }) {
      const post = state.posts.find(p => {
        return p.id === id;
      });
      post.title = title;
      post.description = description;
    },
  },
  actions: {
    async createPost({ commit, getters }, payload) {
      commit('clearError');
      commit('setLoading', true);
      const image = payload.image;
      try {
        const newPost = new Post(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo,
        );
        const post = await firebase
          .database()
          .ref('posts')
          .push(newPost);

        const imageExt = image.name.slice(image.name.lastIndexOf('.'));
        const fileData = await firebase
          .storage()
          .ref(`posts/${post.key}.${imageExt}`)
          .put(image);

        const imgSrc = await fileData.ref.getDownloadURL();

        await firebase
          .database()
          .ref('posts')
          .child(post.key)
          .update({ imgSrc });

        commit('setLoading', false);
        commit('createPost', {
          ...newPost,
          id: post.key,
          imgSrc,
        });
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },
    async fetchPosts({ commit }) {
      commit('clearError');
      commit('setLoading', true);

      const postsArray = [];
      try {
        const fbPostsValue = await firebase
          .database()
          .ref('posts')
          .once('value');
        const posts = fbPostsValue.val();

        Object.keys(posts).forEach(key => {
          const post = posts[key];
          postsArray.push(
            new Post(post.title, post.description, post.ownersId, post.imgSrc, post.promo, key),
          );
        });
        commit('loadPosts', postsArray);
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },
    async updatePost({ commit }, { title, description, id }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        await firebase
          .database()
          .ref('posts')
          .child(id)
          .update({
            title,
            description,
          });
        commit('updatePost', { title, description, id });
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },
  },
  getters: {
    posts(state) {
      return state.posts;
    },
    promoPosts(state) {
      return state.posts.filter(post => {
        return post.promo;
      });
    },
    myPosts(state, getters) {
      return state.posts.filter(post => {
        return post.ownersId === getters.user.id;
      });
    },
    postById(state) {
      return postId => {
        return state.posts.find(post => post.id === postId);
      };
    },
  },
};
