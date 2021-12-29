<template>
<v-app>
  <div id="nav">
    <router-link to="/Registered">Signup</router-link>
    <Header></Header>
    <Login></Login>
  <router-view/>
    </div>
</v-app>
</template>

<script>
import Header from "../src/components/Header.vue"
import Login from "../src/components/Auth/LoginForm.vue"

export default {
  name: "App",
  components: {
    Header, 
    Login
  },

  data:() => {
    
  }
}

</script>

<style>

 #app {
  /* telecharger typo  */
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav li {
  list-style-type: none;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} 

#container {
  color: red
}

#footer {
  color : blue
}
</style>
