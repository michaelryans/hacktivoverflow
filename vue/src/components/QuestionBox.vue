<template>
    <!-- <div class="main-box">
        <div class="pembanding">
            <div class="vav">

            </div>
        </div>
        <div class="pembanding">
            testsetse
        </div>
    </div> -->
    
    <b-container fluid class="whole-card-container">
        <b-row class="main-box">
            <b-col cols="3" class="left-container">
                <b-row class="vav-container">
                    <b-col class="vav">{{question.upvote}}<br>Vote</b-col>
                    <b-col class="vav">{{question.downvote}}<br>Views</b-col>
                    <b-col class="vav">xx<br>Answer</b-col>
                    <!-- <b-col class="vav">xx<br>Ans</b-col> -->
                </b-row>
            </b-col>
            <b-col cols="9" class="right-container">
                
                <b-container>
                    <b-row class="question-header">
                        Q <i class="fas fa-angle-right"></i> &nbsp;<router-link v-bind:to="'/question/'+question._id">{{question.question}}</router-link> 
                    </b-row>
                    <b-row>
                         by: {{question.user.name}}
                    </b-row>
                </b-container>
            </b-col>

        </b-row>
    </b-container>
</template>
<script>
export default {
    props:['question'],
    name:"QuestionBox",
    created() {
        // console.log(this.question)
        // console.log('------- question box')
    }
}
</script>
<style scoped>
    .question-header {
        display:flex;
        justify-content: flex-start;
        align-items: center;
        align-content: space-between;
    }
    .main-box {
        width: 100%;
        height: 85px;
        display:flex;
        padding-left:15px;
    }
    .box {
        height: 40px;
        width: 40px;
    }

    .box-text {
        font-size: 14px;
        max-width: 100%;
    }
    .vav-container {
        height:100%;
        align-self:center;
    }
    .vav {
        display:flex;
        justify-content: center;
        align-content:center;
        padding-left: 3px;
        padding-right: 3px;
        height: 100%;
        border: 1px solid rgba(17, 75, 86, 0.1);
        overflow:hidden;
        align-items: center;
        font-size: 13px;
    }

    .right-container {
        border: 1px solid rgba(17, 75, 86, 0.1);
        text-align:left;
    }
    .pembanding {
        border: 1px solid rgba(17, 75, 86, 0.5);
    }

</style>
