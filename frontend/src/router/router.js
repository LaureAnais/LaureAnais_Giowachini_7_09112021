import Vue from 'vue'
import Router from 'vue-router'

//Importer home depuis components 
import NavBar from '../components/navBar.ce.vue'
import Signup from '../components/signupForm.ce.vue'
import Login from '../components/loginForm.ce.vue'
import PostComment from '../components/postComment.ce.vue'

Vue.use(Router)


export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: NavBar
        },
        {
            path: '/login', 
            component: Login
        },
        {
            path: '/signup', 
            component: Signup
        },
        {
            path: '/postComment', 
            component: PostComment
        }
    ]


})