<template>
<v-container>

<v-card  class="mx-auto my-12" max-width="700" >
   <v-card-actions > 
      <v-form v-model="valid" @submit.prevent="AddPostToBack()">
        <v-row>
          <v-col cols="1">
            <!-- <v-file-input 
             v-model="postimgtoback"  
              hide-input
              truncate-length="15"
              >
          </v-file-input> -->
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

    <v-card-title class="mx-auto my-12" justify-space-around>
      <v-row>
      <!-- Ajouter row pour englober pseudo et icones modifier et delete
      spacer  
      
      Englober les icones dans une div indépendante pour mettre les icones à droite
      La ou le pseudo reste seul dans sa div pour rester à droite 
      Donc mettre 4 ou 3 à la div pseduo 
      Puis 8 à la div icones et ensuite rediviser dedans

      -->
      
        <v-col cols="4" justify-space-around>
     
            {{post.fk_users_posts.pseudo}}
           
        </v-col>
          
        <v-col cols="4">  
          <v-btn color="black" text type="submit"> 
            <v-icon
              medium
              class="mr-2"
              @click="editItem(post.id)"
            >
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-col>


        <v-col cols="4">  
          <v-btn color="black" text type="submit"> 
            <v-icon
              medium
              @click="deleteItem(post.id)"
            >
              mdi-delete
            </v-icon>
          </v-btn>
        </v-col>
   
    </v-row>
    </v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
      </v-row>
        <div>
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
    <CommentForm :postid="post.id" ></CommentForm>
    <!-- :SenttoPost="showPostComment($event)" -->
    
  </v-card>
</v-container>
  
</template>

<script>
  import axios from 'axios'
  import CommentForm from '../Comments/CommentForm.vue'
  // import UpdatePost from '../Home/UpdatePost.vue'
  export default {
    name: "GetAllPosts" ,
    components: {
      CommentForm,
      // UpdatePost
    }, 
    data () {
      return {
        loading: false,
        selection: 1,
        posts: [],
        newPost: "",
        fromComtoPost: true,
        formRules: [
                  v => /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F0-9~!@#$%^&*()`{};':,./<>?| ]*$/.test(v) || "Merci de ne pas mettre de caractères spéciaux", 
                  ],
        valid: true,
      }
    },  
    
     computed: {
      form() { return this.$refs.form }
    },

    methods: {
      showPost() {
        axios
            .get("http://localhost:3001/api/post")
            .then((response) => {
                this.posts = response.data
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
          this.newPost=""
        })
        .catch(function (error) {
                    console.log(error);
                })
      }, 
      deleteItem (postId) {
        const token =  JSON.parse(localStorage.getItem("token")) 
        axios
            .delete(`http://localhost:3001/api/post/${postId}`, {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token.token}` 
                    } 
            }
            
                    )
            .then(() => {
                this.showPost()
                //reactualiser la page 
            })
            .catch(() => {})
      } 
    }, 
    mounted() {this.showPost()
    
    },
    
      //   showPostComment(fromComtoPost) {
      //           this.fromComtoPost=fromComtoPost
      //           if(this.fromComtoPost){
      //             this.showPost()
      //           } this.fromComtoPost = true
      //           console.log(this.fromComtoPost)
      // }    


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