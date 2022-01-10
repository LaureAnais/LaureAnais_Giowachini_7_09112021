<template>
    <div id="app">
        <h1>Groupomania Chat</h1>
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