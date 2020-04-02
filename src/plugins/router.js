import Vue from 'vue'
import VueRouter from 'vue-router';
import Users from '../components/pages/users/Index.vue'
import Tasks from '../components/pages/tasks/Index.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Users,
    name: 'Users'
  },
  {
    path: '/tasks',
    component: Tasks,
    name: 'Tasks'
  },
];

export default new VueRouter({ routes });