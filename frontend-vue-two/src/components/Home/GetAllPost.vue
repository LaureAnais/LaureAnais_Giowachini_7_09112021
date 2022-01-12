<template>
<v-container>

<v-card v-for="post in posts" :key="post.id"
    :loading="loading"
    class="mx-auto my-12"
    max-width="700"
  >
    <template slot="progress">
      <v-progress-linear
        color="teal"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img 
      v-if="post.picture_uploaded"
      height="250"
      :src="post.picture_uploaded"
    ></v-img>

    <v-card-title>
      <p class="font-weight-light">
      {{post.fk_users_posts.pseudo}}
      <!-- {{posts}} -->
    </p></v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
      </v-row>
        <div>
          <!-- Mettre texte en 16 -->
          <p class="text-left">
               {{ post.message }}
        </p>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card
      class="d-flex flex-row mb-6 justify-space-around">
      <v-col cols="6" sm="3">
              <v-btn
                class="ma-2"
                text
                icon
                color="blue lighten-2"
              >
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
      </v-col>

      <v-col cols="6" sm="3">
            <v-btn
              class="ma-2"
              text
              icon
              color="red lighten-2"
            >
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
      </v-col>      
    </v-card>
    <!-- v-for="comment in post.fk_posts_comments" :key="comment.id" -->

      <div v-for="comment in post.fk_posts_comments" :key="comment.id">
        <v-card-subtitle-1>
          <p class="text-left ml-4">
            {{comment.fk_users_comments.pseudo}}
          </p>    
        </v-card-subtitle-1>
    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
      </v-row>
        <div>
          <p class="text-left">
               {{ comment.message }}
        </p>
      </div>
    </v-card-text>
    </div>
    <CommentForm :postid="post.id"></CommentForm>
    
  </v-card>
</v-container>
  
</template>

<script>
  import axios from 'axios'
  import CommentForm from '../Comments/CommentForm.vue'
  export default {
    name: "GetAllPosts" ,
    components: {
      CommentForm,
    }, 
    data: () => ({
      loading: false,
      selection: 1,
      posts: [],
      formRules: [
                v => !!v || "Merci de compléter le formulaire",
                ],
    }),
     computed: {form() { return this.$refs.form }
    },

    methods: {
      showPost() {
        axios
            .get("http://localhost:3001/api/post")
            .then((response) => {
                this.posts = response.data
                console.log(this.posts)

            })
            .catch(() => {})
        }   
    },
    mounted() {this.showPost()
    
    },
  }
</script>
