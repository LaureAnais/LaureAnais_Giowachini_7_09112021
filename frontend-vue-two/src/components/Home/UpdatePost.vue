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
          <v-col cols="10">
            
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
    
    }
}

</script>
