<template>
    <div>
    <b-button b-button variant="light" v-b-modal.login style="margin:5px;" >Login</b-button>

    <!-- Modal Component -->
    <b-modal id="login" title="Login"  centered ref="modal-login">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          type="email"
          required
          placeholder="Enter email"
          v-model="login.email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          type="password"
          id="input-2"
          required
          placeholder="Enter password"
          v-model="login.password"
          @keyup.enter="submitLogin"
        ></b-form-input>
      </b-form-group>

        <div slot="modal-footer">
            <b-button class="my-2 my-sm-0" @click="submitLogin">Login</b-button>
        </div>
    </b-modal>
  </div>
</template>

<script>
export default {
    name:"Login",
    methods: {

    },
    data() {
      return {
        login: {
          email:"",
          password: "",
        }
      }
    },
    methods: {
      showModal() {
            this.$refs['modal-login'].show()
      },
      hideModal() {
          this.$refs['modal-login'].hide()
      },
      submitLogin() {
        this.hideModal()
         let obj_login = {
           email:this.login.email,
           password: this.login.password,
         }

         console.log(obj_login)
        //  console.log(this.$store.state.serverUrl)

        this.axios
        .post(this.$store.state.serverUrl + '/users/login', obj_login)
        .then(({data}) => {
          console.log('sukses login')
          this.$store.commit('login', data)
          localStorage.token = data.token;
          this.$swal.fire(
            'Login success!',
            'Welcome to Hacktiv Overflow!',
            'success'
          )
        })
        .catch(er => {
          console.log('error')
          this.$swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
       }
    }
}
</script>
