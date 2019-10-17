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
    posts: [
      {
        title: 'First post',
        description: 'Hi Guys',
        promo: false,
        imgSrc:
          'https://cdn.onebauer.media/one/radio-legacy/47/52bac/862c0/d9b9e/ef85b/e3dcd/ca87a/dimebagvinnie-getty.jpg?quality=80&width=960&ratio=16-9&resizeStyle=aspectfill&format=jpg',
        id: '123',
      },
      {
        title: 'Second post',
        description: 'Hi Guys2',
        promo: true,
        imgSrc:
          'http://www.mixdownmag.com.au/sites/default/files/styles/flexslider_h400/public/images/dimebag.jpg?itok=_osaAvue',
        id: '1234',
      },
      {
        title: 'Third post',
        description: 'Hi Guys3',
        promo: true,
        imgSrc:
          'https://www.billboard.com/files/styles/landscape_768/public/media/dimebag-darrell-pantera-billboard-650.jpg',
        id: '1235',
      },
    ],
  },
  mutations: {
    createPost(state, payload) {
      state.posts.push(payload);
    },
  },
  actions: {
    async createPost({ commit, getters }, payload) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const newPost = new Post(
          payload.title,
          payload.description,
          getters.user.id,
          payload.imgSrc,
          payload.promo,
        );
        const post = await firebase
          .database()
          .ref('posts')
          .push(newPost);
        commit('setLoading', false);
        commit('createPost', {
          ...newPost,
          id: post.key,
        });
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
    myPosts(state) {
      return state.posts;
    },
    postById(state) {
      return postId => {
        return state.posts.find(post => post.id === postId);
      };
    },
  },
};
