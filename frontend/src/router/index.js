import Vue from 'vue'
import Router from 'vue-router'

//Importer home depuis components => créer component home
import Home from '../views/Home.vue'
import Signup from '../components/signupForm.ce.vue'

Vue.use(Router)

const routes =[
    {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  
    ]

const router = createRouter({
    history: createWebHistory(),
    routes 
})

export default router