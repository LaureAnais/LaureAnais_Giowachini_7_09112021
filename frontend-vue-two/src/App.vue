<template>
<v-app>
  <div id="app">
    <nav></nav>
  <router-view/>
    </div>
</v-app>
</template>

<script>


export default {
  name: "App",
  components: {

  },

  data:() => {
    return {

    }
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
  background-color: indigo darken-4
}


</style>
