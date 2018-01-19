<template>
  <div id="app">
     <v-app id="inspire">
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title>JWT APP</v-toolbar-title>
      <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/" exact>Home</v-btn>
      <v-btn flat to="/signup">Sign Up</v-btn>
      <v-btn flat to="/login">Login</v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
         <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
    }
  }
}
</script>
