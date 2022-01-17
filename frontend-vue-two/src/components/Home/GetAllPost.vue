<template>
<v-container>

<v-card  class="mx-auto my-12" max-width="700" >
   <v-card-actions > 
      <v-form v-model="valid" @submit.prevent="AddPostToBack()">
        <v-row>
          <v-col cols="1">
            <v-file-input 
              v-model="postimgtoback" 
              hide-input
              truncate-length="15"
              >
          </v-file-input>
          </v-col>
          <v-col cols="10">
            <!-- Changer la couleur bleu et mettre rouge partout -->
            
            <v-text-field
            label="Créer un post"  v-model="newPost" type="text" :rules="formRules" class="rounded-0" required
         
              clear-icon="mdi-close-circle"
              clearable

              @click:append-outer-icon="editItem(post.id)"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
             <v-btn color="black" text type="submit"> 
          <v-icon
            medium
            class="mr-2 sendPost"
            @click="editItem(post.id)"
          >
            mdi-send
          </v-icon>
        </v-btn> 
          </v-col>
      </v-row>
         <!-- :append-outer-icon="'mdi-send'" -->
      </v-form>
      
    </v-card-actions>
</v-card>

<v-card 
v-for="post in posts" :key="post.id"
    :loading="loading"
    class="mx-auto my-12"
    max-width="700"
  >
    <v-img 
      v-if="post.picture_uploaded"
      height="250"
      :src="post.picture_uploaded"
    ></v-img>

    <v-card-title>
      <p class="font-weight-light">
      {{post.fk_users_posts.pseudo}}
      
        
    <v-btn color="black" text type="submit"> 
      <v-icon
        small
        class="mr-2"
        @click="editItem(post.id)"
      >
        mdi-pencil
      </v-icon>
    </v-btn>

    <v-btn color="black" text type="submit"> 
       <v-icon
        small
        @click="deleteItem(post.id)"
      >
        mdi-delete
      </v-icon>
    </v-btn>

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
    data () {
      return {
        loading: false,
        selection: 1,
        posts: [],
        newPost: "",
        formRules: [
                  v => /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F0-9~!@#$%^&*()`{};':,./<>?| ]*$/.test(v) || "Merci de ne pas mettre de caractères spéciaux", 
                  ],
        valid: true,
      }
    },
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
        },
      AddPostToBack() {
        const token =  JSON.parse(localStorage.getItem("token"))   
        const postToBack = {
            message: this.newPost,
        }

        axios
        .post("http://localhost:3001/api/post", postToBack,  
        {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token.token}` 
                    }
            }
        )
        .then(() => {
          this.showPost()
          // Voir pour changer le focus après avoir écrit le post pour éviter de rester en rouge dans le post. L'orienter aileurs sur la page 
          this.newPost=""
        })
        .catch(function (error) {
                    console.log(error);
                })
      }     
    },
    mounted() {this.showPost()
    
    },
  }
</script>

<style>
#app {
background-color: indigo darken-4
}

button .sendPost {
  /* font-size: 20px !important; */
  padding-top: 30px !important;
}

/* .rounded-0{
  
} */

</style>