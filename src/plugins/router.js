import Vue from 'vue'
import VueRouter from 'vue-router';
import Tasks from '../pages/tasks/Index.vue'
import Login from '../components/login.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Tasks,
    name: 'Tasks'
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
];

export default new VueRouter({ routes });