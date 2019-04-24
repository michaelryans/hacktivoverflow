<template>
  <b-container fluid>

    <b-row>

      <b-col cols="9" id="left-column">
        <b-row class="question-header">
            <router-view/>
        </b-row>


        <b-row class="question-header">
          <!-- <div> -->
          <div>
            <h3>Questions</h3>
          </div>

          <router-link to="/ask" v-show="$store.state.isLogin.status">
            <b-button size="sm" >Ask a question</b-button>
          </router-link>
          <!-- </div> -->
        </b-row>

        <b-row v-for="question in questions" :key="question._id">
          <QuestionBox v-bind:question="question"/>
        </b-row>
      </b-col>

      <!-- featured questioni -->
      <FeaturedQuestion />
    </b-row>
  </b-container>

</template>
<script>
import QuestionBox from "@/components/QuestionBox.vue";
import FeaturedQuestion from '@/components/FeaturedQuestions.vue'
export default {
  name: "Question",
  created() {
    this.$store.dispatch("getQuestion");
  },
  components: {
    QuestionBox,
    FeaturedQuestion
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  data() {
    return {
      test: "test"
    };
  },
  computed: {
    questions() {
      return this.$store.state.list.questions;
    }
  },
  watch: {
    $route(to,from) {
      this.$store.dispatch('getQuestion')
    }
  }
};
</script>
<style scoped>
.question-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0px;
  margin-top: 10px;
}

#right-panel {
  border: 1px solid lightgrey;
}

#left-column {
  margin-bottom: 15px;
}

</style>

