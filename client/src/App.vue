<template>
  <div id="app">
    
    <!-- navbar -->
    <b-container fluid id="nav-wrapper">
      <b-container>
        <Navbar />
      </b-container>

    </b-container>

    <b-container id="main-div">
      <b-row >
        <b-col cols="2" id="main-navigation">
        <ul id="ul-navigation"> 
          <li id="nav-title"> <i class="fab fa-stack-exchange"></i>&nbsp; Navigation</li>
          <router-link to="/question"><li>Home</li></router-link>
          <router-link to="/ask"><li>Ask a question</li></router-link>
        </ul>
      </b-col>
      <b-col id="main-content">
        <router-view/>

        <!-- <div id="nav">
           |
          |
          
        </div> -->
      </b-col>
      </b-row>
    </b-container>



  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav-wrapper {
  background-color: #17A2B8;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#main-div {
  border: 1px solid rgba(17, 75, 86, 0.5);
  /* display:flex; */
}

#main-content {
  border: 1px solid rgba(17, 75, 86, 0.5);
  display:flex;
  justify-content:center;
  /* flex-grow:1; */
}

#main-navigation {
  border: 1px solid rgba(17, 75, 86, 0.5);
  padding-left: 0px;
  padding-right: 0px;
}

#ul-navigation{
  padding-left: 0px;
  list-style-type:none;
}

li {
  display:flex;
  justify-content: center;
  align-items: center;
  height:40px;
  text-decoration:none;
  
}

li:hover {
  background-color:lightgrey;
}

#nav-title {
  margin-top: 10px;
  font-size: 20px;
}
</style>
