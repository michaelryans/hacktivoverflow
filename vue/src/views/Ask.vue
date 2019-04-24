<template>
  <b-container fluid>
    <b-row>
      <b-col cols="9" id="ask-form">
        <b-row id="left-column">
            <b-form-group id="input-question-title" label="Type your Question here:" label-for="input-1">
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
            <b-button size="sm" @click="postQuestion">Post Question</b-button>
            <!-- </div> -->
          </b-row>
        </b-row>
      </b-col>


      <b-col cols="3" id="right-panel">
        <b-row id="extra-panel-title">
          Featured Questions
        </b-row>
        <b-row id="extra-panel">
          Featured
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "ask",
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
    postQuestion() {
      let obj_question = {
        question:this.question.question,
        description: this.question.description,
        tags: this.question.tags,
        upvote: 0,
        downvote: 0,
      }
      
      // console.log( this.$store.state.isLogin.token)
      this.axios
      .post(this.$store.state.serverUrl + '/questions', obj_question, {headers: {token: localStorage.token}})
      .then(({ data }) => {
        console.log(data)
        console.log('sukses post question')
        this.$swal.fire(
            'Question post success!',
            'yay!',
            'question'
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


#left-column {
  padding-right:15px;
  padding-top:15px;
  padding-bottom:15px;
}

#extra-panel {
  padding:5px;
  padding-right:0px;
  height: 100px;
  margin-left: 0px;
  margin-top: 15px;
  border: 1px solid rgba(17, 75, 86, 0.1);
}
#extra-panel-title {
  padding:5px;
  padding-right:0px;
  margin-left: 0px;
  margin-top: 15px;
  border: 1px solid rgba(17, 75, 86, 0.1);
}
</style>
