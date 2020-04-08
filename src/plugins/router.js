import Vue from 'vue'
import VueRouter from 'vue-router';
import Tasks from '../pages/tasks/Index.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Tasks,
    name: 'Tasks'
  }
];

export default new VueRouter({ routes });