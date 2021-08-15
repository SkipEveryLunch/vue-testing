import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import UsersPage from '../pages/UsersPage.vue';
import UserPage from '../pages/UserPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SignUpPage from '../pages/SignUpPage.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/signup',
    component: SignUpPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/user',
    component: UsersPage,
  },
  {
    path: '/user/:userId',
    component: UserPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
