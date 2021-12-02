import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: "Home", 
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    meta: {
    pageTitle: "Page d'accueil",
    requiresAuth: true
    }
  },
  {
    path: '/Registered', 
    name: "Registered",
    component: () => import(/* webpackChunkName: "Registered" */ '../views/Registered.vue'),
    meta: {
    pageTitle: "Page de connexion",
    requiresAuth: true
    }
 },
  {
      path: '/login', 
      name: "Login",
      component: () => import(/* webpackChunkName: "Inscription" */ '../views/Login.vue'),
      meta: {
      pageTitle: "Page de connexion",
      requiresAuth: true
    } 
  },
  // {
//     path: '/Profile',
//     name: "Profile",
//     component: Profile
// },
// {
//     path: '/logout', 
//     name: "logout",
//     component: Logout
// },

  
// {
//     path: '/Admin', 
//     name: "Admin",
//     component: Admin
// }
];

const router = new VueRouter({
  routes,
});

export default router;
