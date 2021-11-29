import { createRouter, createWebHistory } from 'vue-router'

//Importer home depuis components 
import Signup from '../views/Signup.vue'
import Logout from '../views/Logout.vue'
import Profile from '../views/Profile.vue'
import Registered from '../views/Registered.vue'
import Admin from '../views/Admin.vue'


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
        path: '/signup', 
        name: "Signup",
        component: Signup
    },
    {
        path: '/logout', 
        name: "logout",
        component: Logout
    },
    {
        path: '/Profile',
        name: "Profile",
        component: Profile
    },
    {
        path: '/Registered', 
        name: "Registered",
        component: Registered
    },
    {
        path: '/Admin', 
        name: "Admin",
        component: Admin
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes 
})

export default router