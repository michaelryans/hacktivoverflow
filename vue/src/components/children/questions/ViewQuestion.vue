<template>
    <b-row id="view-question-header">
        <router-link to="/question">Close Question</router-link>
        <!-- all  -->
        <b-container fluid>


            <!-- view questions -->
         <b-container fluid>
             <b-row id="question-title">
            Q > {{question.question}}
            </b-row>
            <b-row id="question-etc">
                By: {{question.user.name}}, upvote: {{question.upvote}} | downvote: {{question.downvote}}
            </b-row>
            <b-row id="question-tags">
                Tags: {{question.tags}}
            </b-row>

            <b-row id="question-description">
                Description: {{question.description}}
            </b-row>
            <b-row>
                <button @click="editQuestion(question._id)"><i class="fas fa-edit"></i> Question</button>
                <button @click="upvoteQuestion(question._id)"><i class="far fa-thumbs-up"></i></button>
                <button @click="downvoteQuestion(question._id)"><i class="far fa-thumbs-down"></i></button>
                <button @click="deleteQuestion(question._id)"><i class="fas fa-trash-alt"></i> Question</button>
            </b-row>
         </b-container>

        <!-- component -->
        <div class="divider"></div>
        <b-row id="answer-start" style="padding:left;">Answers</b-row>
        <div class="divider"></div>
        <b-row v-for="x in answer" :key="x._id">
            <ViewAnswerBox v-bind:answer="x" />
            <div class="divider"></div>
        </b-row>

        <!-- write answers -->
            <b-row>
                Your Answer
            </b-row>
            <b-row>
              <b-form-textarea
                id="textarea"
                v-model="writeAnswer.answer"
                placeholder="Enter something..."
                rows="5"
                max-rows="6"
              ></b-form-textarea>
        </b-row>
        <b-row id="button-post">
            <div></div>
            <b-button size="sm" @click="postAnswer">Post Answer</b-button>
        </b-row>
        
        <div class="divider"></div>
        </b-container>
        <!-- </div> -->
    </b-row>
</template>

<script>
import ViewAnswerBox from '@/components/ViewAnswerBox.vue'
export default {
    name:"ViewQuestion",
    created() {
        this.getQuestion()
        this.getAnswer()
        // console.log(question)
    },
    components: {
        ViewAnswerBox,
    },
    data() {
        return {
            question:{},
            writeAnswer: {
                answer:""
            },
            answer: [],
        }
    },
    methods: {
        deleteQuestion(input) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {

                    this.axios
                    .delete(this.$store.state.serverUrl + '/questions/' + input, {headers:{token:localStorage.token}})
                    .then(delResponse => {
                        this.$swal.fire('Deleted!','Your file has been deleted.','success')
                        this.$router.push('/question')
                    })
                    .catch(err=> {
                        console.log(err)
                        this.$swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    })
                    
                }
            })

        },
        upvoteQuestion(input){
          let new_upvote_value = this.question.upvote + 1
            let upvote_obj = {
                upvote: new_upvote_value
            }

            this.axios
            .patch(this.$store.state.serverUrl + '/questions/' + this.question._id, upvote_obj, {headers: {token: localStorage.token}})
            .then(({ data }) => {
                console.log(data)
                console.log('sukses upvote!')
                this.$swal.fire(
                    'Thanks for the vote!',
                    '',
                    'success'
                )
                this.question = data;
            })
            .catch(err => {
                console.log(err)
            })
        },
        downvoteQuestion(input) {
           let new_downvote_value = this.question.downvote + 1
            let downvote_obj = {
                downvote: new_downvote_value
            }

            this.axios
            .patch(this.$store.state.serverUrl + '/questions/' + this.question._id, downvote_obj, {headers: {token: localStorage.token}})
            .then(({ data }) => {
                // console.log(data)
                console.log('sukses upvote!')
                this.$swal.fire(
                    'Thanks for the vote!',
                    '',
                    'success'
                )
                this.question = data;
            })
            .catch(err => {
                console.log(err)
            })
        },
        editQuestion(input) {
            this.$router.push('/edit-question/' + input)
        },
        getQuestion() {
            // console.log(this.$route.params)
            // console.log('---------------')
            // console.log(this.$store.state.serverUrl)
            // console.log(this.axios)
            this.axios
            .get(this.$store.state.serverUrl + '/questions/' + this.$route.params.id )
            .then(({ data }) => {
                // console.log('data diterimaa---------- viewquestion.vue')
                // console.log(data)
                this.question = data
            })
            .catch(err => {
                console.log(err)
                console.log('gagal terima data viewquestion.vue')
            })
        },
        getAnswer() {
            console.log(this.$store.state.serverUrl +'/answers/question/' + this.$route.params.id)
            this.axios
             .get(this.$store.state.serverUrl +'/answers/question/' + this.$route.params.id)
             .then(({ data }) => {
                 this.answer = data
                //  console.log(data)
                //  console.log('success fetching answer based on id ' + this.$route.params.id)
             })
             .catch(err => {
                 console.log(err)
                //  console.log('error fetching answer based on question id')
             })

        },
        postAnswer() {
            // console.log(this.writeAnswer.answer)
            let obj_answer = {
                answer:this.writeAnswer.answer,
                upvote: 0,
                downvote: 0,
            }

            this.axios
             .post(this.$store.state.serverUrl + '/answers/' + this.$route.params.id, obj_answer, {headers: {token:localStorage.token}})
             .then(({ data }) => {
                 this.answer.push(data)
                 console.log('success answering question')
                 this.writeAnswer.answer=""
                  this.$swal.fire(
                    'Success posting Answer!',
                    'Thank you for your answer!',
                    'success'
                )
             })
             .catch(err => {
                 this.$swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
                console.log(err)
             })

        }
    },
    watch: {
        $route(to,from) {
            this.getQuestion()
            this.getAnswer()
        }
    }
}
</script>
<style scoped>
#button-post {
    display:flex;
    justify-content: space-between;
}
#answer-start {
    padding-left:15px;
    font-size: 25px;
}
#view-question-header {
  width: 100%;
  display: flex;
  margin: 0px;
}

.row {
    margin-top: 15px;
}

.divider {
    width: 100%;
    height: 3px;
    margin-top: 20px;
    background-color:lightgrey;
}

#question-title {
    font-size: 30px;
}

#question-etc {
    margin-top: 0px;
}
#question-tags {
    margin-top:0px;
}
#question-description {
    text-align:left;
}
</style>

