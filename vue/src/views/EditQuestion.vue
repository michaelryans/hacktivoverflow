<template>
  <b-container fluid>
    <b-row>
      <b-col cols="9">
        

        <b-row>
            <b-form-group id="input-question-title" label="Title:" label-for="input-1">
              <b-form-input
                type="text"
                id="input-1"
                required
                placeholder="Input Question Title"
                v-model="question.question"
              ></b-form-input>
            </b-form-group>

              <b-form-textarea
                id="textarea"
                v-model="question.description"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>

              <b-form-group id="input-question-tags" label="Tags:" label-for="input-2">
              <b-form-input
                type="text"
                id="input-2"
                required
                placeholder="Input Tags (not implemented)"
                v-model="question.tags"
              ></b-form-input>
            </b-form-group>

           <b-row class="question-header">
            <!-- <div> -->
            <div>
                <!-- LEFT DIV -->
            </div>
            <b-button size="sm" @click="editQuestion">Edit Question</b-button>
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
  name: "EditQuestion",
  created() {
      this.axios
      .get(this.$store.state.serverUrl + '/questions/' + this.$route.params.id)
      .then(({ data }) => {
          console.log('data ---- edit question')
          this.question = data
      })
  },
  data() {
    return {
      question: {
        question: "",
        description: "",
        tags: ""
      }
    }
  },
  methods: {
    editQuestion() {
      let edit_question = {
        question:this.question.question,
        description: this.question.description,
        tags: this.question.tags,
      }
      
    //   console.log(edit_question)
      this.axios
      .patch(this.$store.state.serverUrl + '/questions/' + this.$route.params.id, edit_question, {headers: {token: localStorage.token}})
      .then(({ data }) => {
        console.log(data)
        console.log('sukses update question')
        this.$swal.fire(
            'Question updated!',
            'yay!',
            'success'
        )
        this.$router.push('/question/' + data._id)
      })
      .catch(err => {
        console.log(err)
      })

    }
  }
};
</script>
<style>
#input-question-title, #input-question-tags {
  width: 100%;
  text-align: left;
}
.question-header {
    width:100%;
    display:flex;
    justify-content:space-between;
    margin:0px;
}

#right-panel {
    border: 1px solid lightgrey;
}

</style>
