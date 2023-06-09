import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        { path: '/pacientes', name: 'pacientes', component: () => import('@/components/Pacientes.vue'), },
        { path: '/cadastro', name: 'cadastro', component: () => import('@/components/Cadastro.vue'), },
        { path: '/editar/:id', name: 'editar', component: () => import('@/components/Editar.vue'), },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/login';
    }
});

export default router
