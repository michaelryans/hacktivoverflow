<template>
     <b-container>
            <b-row id="answer-content">
                <b>Answer></b>  {{answer.answer}}
            </b-row>
            <b-row id="answer-etc">
                By: {{answer.user.name}}, upvote: {{answer.upvote}} | downvote: {{answer.downvote}}
            </b-row>
            <!-- <b-row>
                Tags: 
            </b-row> -->

            <b-row>
                <button @click="editAnswer(answer._id)"><i class="fas fa-edit"></i> Answer</button>
                <button @click="upvoteAnswer(answer._id)"><i class="far fa-thumbs-up"></i></button>
                <button @click="downvoteAnswer(answer._id)"><i class="far fa-thumbs-down"></i></button>
            </b-row>
        </b-container>
</template>
<script>
export default {  
    props:['answer'],
    name:"ViewAnswerBox",
    created() {
        // console.log(this.answer)
        // console.log('this is in viewanswerbox')
    },
    computed: {
        userId() {
            return this.$store.state.isLogin.user_id
        }
    },
    methods: {
        editAnswer(input) {
            // console.log(input)
            // console.log(this.userId)
            this.$router.push('/edit-answer/' + input)
        },
        upvoteAnswer(input) {
            // console.log(input)

            let new_upvote_value = this.answer.upvote + 1
            let upvote_obj = {
                upvote: new_upvote_value
            }
            // console.log(upvote_obj)

            this.axios
            .patch(this.$store.state.serverUrl + '/answers/' + this.answer._id, upvote_obj, {headers: {token: localStorage.token}})
            .then(({ data }) => {
                console.log('sukses upvote!')
                this.$swal.fire(
                    'Thanks for the vote!',
                    '',
                    'success'
                )
                this.answer = data;
            })
            .catch(err => {
                console.log(err)
            })
        },
        downvoteAnswer(input) {
            // console.log(input)

            let new_downvote_value = this.answer.downvote + 1
            let downvote_obj = {
                downvote: new_downvote_value
            }
            // console.log(downvote_obj)

            this.axios
            .patch(this.$store.state.serverUrl + '/answers/' + this.answer._id, downvote_obj, {headers: {token: localStorage.token}})
            .then(({ data }) => {
                console.log('sukses upvote!')
                this.$swal.fire(
                    'Thanks for the vote!',
                    '',
                    'success'
                )
                this.answer = data;
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<style scoped>
.container {
    margin: 15px;
}

#answer-etc {
    margin-top: 0px;
    font-size: 15px;
}

#answer-content{
    margin-top:0px;
    text-align:left;
}
/* 
.divider {
    width: 100%;
    height: 3px;
    margin-top: 20px;
    margin-left:15px;
    margin-right: 15px;
    background-color:lightgrey;
} */

.row {
    margin-top: 15px;
}


</style>
