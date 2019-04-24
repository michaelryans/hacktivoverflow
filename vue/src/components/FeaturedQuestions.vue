<template>
  <b-col cols="3" id="right-panel">
    <b-row id="extra-panel-title">Featured Questions</b-row>
    <b-row id="extra-panel">Featured</b-row>
  </b-col>
</template>

<script>
export default {
  name: "FeaturedQuestion",
  computed: {
    //tambahkan untuk get question
  }
};
</script>
<style scoped>
#right-panel {
  border: 1px solid lightgrey;
}

#extra-panel {
  padding: 5px;
  padding-right: 0px;
  height: 100px;
  margin-left: 0px;
  margin-top: 15px;
  border: 1px solid rgba(17, 75, 86, 0.1);
}
#extra-panel-title {
  padding: 5px;
  padding-right: 0px;
  margin-left: 0px;
  margin-top: 15px;
  border: 1px solid rgba(17, 75, 86, 0.1);
}
</style>
