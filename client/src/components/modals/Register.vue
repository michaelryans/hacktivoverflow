<template>
  <div>
    <b-button b-button variant="light" v-b-modal.register style="margin:5px;">Register</b-button>

    <!-- Modal Component -->
    <b-modal id="register" title="Register Account" centered ref="register">
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
          v-model="register.email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          type="password"
          id="input-2"
          required
          placeholder="Enter password"
          v-model="register.password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Confirm Password:" label-for="input-3">
        <b-form-input
          type="password"
          id="input-3"
          required
          placeholder="Enter password again"
          v-model="register.confirmPassword"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Name:" label-for="input-4">
        <b-form-input
          type="text"
          id="input-4"
          required
          placeholder="Input Your Name"
          v-model="register.name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Adress:" label-for="input-5">
        <b-form-input
          type="text"
          id="input-5"
          required
          placeholder="Input Your Address"
          v-model="register.address"
        ></b-form-input>
      </b-form-group>

      <div slot="modal-footer">
        <b-button class="my-2 my-sm-0" @click="submitRegister">Register</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      register: {
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        name: ""
      }
    };
  },
  methods: {
    showModal() {
      this.$refs["register"].show();
    },
    hideModal() {
      this.$refs["register"].hide();
    },
    submitRegister() {
      let obj_register;
      if (this.register.password === this.register.confirmPassword) {
        let obj_register = {
          email: this.register.email,
          password: this.register.password,
          address: this.register.address,
          name: this.register.name
        };

        console.log(this.$store.state.serverUrl + "/users")
        this.axios
          .post(this.$store.state.serverUrl + "/users", obj_register)
          .then(({ data }) => {
            console.log("sukses registeeeer");
            this.$swal.fire(
              "Register success!",
              "Please login for full access!",
              "success"
            );
            this.hideModal();
          })
          .catch(err => {
            console.log(err);
            this.$swal.fire({
              type: "error",
              title: "Oops...",
              text: "Something went wrong in server!",
              footer: "<a href>Why do I have this issue?</a>"
            });
          });
      } else {
        console.log("password does not match");
        this.$swal.fire({
          type: "error",
          title: "Oops...",
          text: "Password doesn't match!",
          footer: "<a href>Why do I have this issue?</a>"
        });
      }
    }
  }
};
</script>

