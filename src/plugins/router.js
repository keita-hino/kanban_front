import Vue from 'vue'
import VueRouter from 'vue-router';
import Users from '../components/pages/users/Index.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Users,
    name: 'Users'
  },
];

export default new VueRouter({ routes });