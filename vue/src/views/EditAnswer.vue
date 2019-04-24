<template>
  <b-container fluid>
    <b-row>
      <b-col cols="9">


        <b-row>Edit your Answer</b-row>



        <b-row>
          <b-form-textarea
            id="textarea"
            v-model="answer.answer"
            placeholder="Enter something..."
            rows="8"
            max-rows="10"
          ></b-form-textarea>

          <b-row class="answer-header">
            <!-- <div> -->
            <div>
              <!-- LEFT DIV -->
            </div>
            <b-button size="sm" @click="editAnswer">Edit Answer</b-button>
            <!-- </div> -->
          </b-row>
        </b-row>
      </b-col>

      <b-col cols="3" id="right-panel">test</b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "EditAnswer",
  created() {
    this.axios
    .get(this.$store.state.serverUrl + '/answers/' + this.$route.params.id)
    .then(({ data }) => {
      console.log("data ---- edit answer");
      this.answer = data;
    })
    .catch(err => {
      console.log(err)
    })
  },
  data() {
    return {
      answer: {
        answer: ""
      }
    };
  },
  methods: {
    editAnswer() {
      let edit_answer = {
        answer: this.answer.answer,
      };

      console.log(edit_answer)
      this.axios
        .patch(
          this.$store.state.serverUrl + "/answers/" + this.$route.params.id,
          edit_answer,
          { headers: { token: localStorage.token } }
        )
        .then(({ data }) => {
          console.log(data);
          console.log("sukses update question");
          this.$swal.fire("Answer updated!", "yay!", "success");
          this.$router.push("/question/" + data.question);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
/* #input-question-title,
#input-question-tags {
  width: 100%;
  text-align: left;
} */
.answer-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0px;
}

#right-panel {
  border: 1px solid lightgrey;
}
</style>
