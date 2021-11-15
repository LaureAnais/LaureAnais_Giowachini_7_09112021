<script>
//modifier avec signup form
import loginForm from '../components/signupForm.ce.vue'
export default {
    name: "Home",
    components: {
        loginForm,
    }, 
    data() {
        return {
            userId: localStorage.getItem("userId")
        }
    },
    methods: {
        
        
    }
}
</script>

<style>
</style>