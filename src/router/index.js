import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Auth/Login.vue';
import Registration from '@/components/Auth/Registration.vue';
import NewPost from '@/components/Posts/NewPost.vue';
import Post from '@/components/Posts/Post.vue';
import PostList from '@/components/Posts/PostList.vue';
import Orders from '@/components/User/Orders.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
    },
    {
      path: '/post/:id',
      props: true,
      name: 'post',
      component: Post,
    },
    {
      path: '/list',
      name: 'list',
      component: PostList,
    },
    {
      path: '/new',
      name: 'newPost',
      component: NewPost,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
    },
  ],
});
