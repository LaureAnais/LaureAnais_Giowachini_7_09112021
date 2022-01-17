<template>
    <div id="app">
         <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
               <a href="" name="Groupomania" title="Groupomania" target="_blank">
                <v-img src="@/assets/icon-above-font.png" alt="Groupomania" contain height="200"></v-img>
              </a>  
            </v-card>
          </v-col>
        </v-row>     
        <GetAllPost></GetAllPost>
    </div>
</template>

<script>
// import axios from 'axios'
import GetAllPost from "../components/Home/GetAllPost.vue"
export default {
    name: "Home",
    components: {
    GetAllPost
    }, 
    data() {
        return {
            posts:[] 
        }
    },
    // methods: {
    //    showPost() {
    //     axios
    //         .get("http://localhost:3001/api/post")
    //         .then((data) => {
    //             this.posts = data
    //             console.log(data)
    //         })
    //         .catch(() => {})
    //     }   
    // },
    // mounted() {this.showPost()},
}
</script>

<style>
h1
{
    font-family: 'Raleway', Arial, Helvetica, sans-serif;
    font-size: 20px;
    padding-top: 20px;
}
</style>