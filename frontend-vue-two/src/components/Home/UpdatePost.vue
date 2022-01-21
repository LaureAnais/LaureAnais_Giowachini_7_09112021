<template>
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

          <v-col cols="9">
             <p class="font-weight-light">
                {{post.fk_users_posts.pseudo}}
             </p>   
            <v-text-field
            label="Modifier votre post"  v-model="modifyPost" type="text" :rules="formRules" class="rounded-0" required
              {{ post.message }}
              clear-icon="mdi-close-circle"
              clearable

              @click:append-outer-icon="editItem(post.id)"
            ></v-text-field>
          </v-col>
<!-- Insérer le post ici ?? dans le text field-->
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

          <v-col cols="1">
             <v-btn color="black" text type="submit"> 
          <v-icon
            medium
            class="mr-2 deletePost"
            @click="deleteItem(post.id)"
          >
           mdi-delete 
          </v-icon>

        </v-btn> 
        </v-col>
      </v-row>

      </v-form>
      
    </v-card-actions>
</v-card>
</template>

<script>
import axios from 'axios'

export default {
    name: "PostForm",
    components: {

    },
    data () {
        return {
 loading: false,
        selection: 1,
        posts: [],
        modifyPost: "",
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
            .get("http://localhost:3001/api/post/id")
            .then((response) => {
                this.posts = response.data
                console.log(this.posts)

            })
            .catch(() => {})
        },
      AddPostToBack() {
        const token =  JSON.parse(localStorage.getItem("token"))   
        const postToBack = {
            message: this.modifyPost,
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
          this.modifyPost=""
        })
        .catch(function (error) {
                    console.log(error);
                })
      }     
    },
    mounted() {this.showPost()
    
    }
}

</script>
