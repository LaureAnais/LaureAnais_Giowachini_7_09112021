import Vue from 'vue'
import Router from 'vue-router'

//Importer home depuis components => créer component home
import Home from '../components/home.vue'
import Signup from '../signupForm.ce.vue'
import Login from '../components/loginForm.vue'

Vue.use(Router)


export default new Router ({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: Login},
        {path: '/signup', component: Signup}
    ]


})