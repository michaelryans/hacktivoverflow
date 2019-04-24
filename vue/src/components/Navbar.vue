<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#"><i class="fab fa-stack-overflow fa-2x"></i> Hacktiv Overflow</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->
            

          

          <!-- login -->
          <Login v-show="!$store.state.isLogin.status" />

          <!-- regiser -->
          <Register v-show="!$store.state.isLogin.status"/>
          <a href="#" @click="signOut" id="signout" v-show="$store.state.isLogin.status" >Sign Out</a>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Login from '@/components/modals/Login.vue'
import Register from '@/components/modals/Register.vue'
export default {
    name:"Navbar",
    components: {
      Login,
      Register
    },
    methods: {
      signOut() {
        this.$swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to use some features",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I\'m sure!'
            }).then((result) => {
            if (result.value) {
                localStorage.clear()
                this.$store.commit('logout')
                this.$swal.fire('Success!','Successfully logged out.','success')
            }
        })
      }
    }
}
</script>
<style>
a#signout {
  height:38px;
  text-align:center;
  font-size: 16px;
  display:flex;
  align-items:center;
  color:white;
}
</style>
