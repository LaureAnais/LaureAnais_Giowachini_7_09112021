<template>
<v-app>
  <div id="nav">
    <Header></Header>
    <v-main><router-view/></v-main>
    <Footer></Footer>
    </div>
</v-app>
</template>

<script>
import Header from "../src/components/Header.vue"
import Footer from "../src/components/Footer.vue"

export default {
  name: "App",
  components: {
    Header, 
    Footer
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
