import Vue from 'vue'
import VueRouter from 'vue-router';
import Tasks from '../pages/tasks/Index.vue'
import Login from '../components/login.vue'
import Store from '../store'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  relative: true,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

const loginCheck = (to) => {
  const loggedIn = to.matched.some(record => record.meta.isPublic) || Store.state.auth.uid != null;
  return loggedIn;
}

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

router.beforeEach((to, from, next) => {
  if (!loginCheck(to, from, next)) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default new VueRouter({ routes });