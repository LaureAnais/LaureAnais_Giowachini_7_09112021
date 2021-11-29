import { createRouter, createWebHashHistory } from "vue-router";

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
// {
//     path: '/signup', 
//     name: "Signup",
//     component: Signup
// },
// {
//     path: '/logout', 
//     name: "logout",
//     component: Logout
// },
// {
//     path: '/Profile',
//     name: "Profile",
//     component: Profile
// },
// {
//     path: '/Registered', 
//     name: "Registered",
//     component: Registered
// },
// {
//     path: '/Admin', 
//     name: "Admin",
//     component: Admin
// }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
