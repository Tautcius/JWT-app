<template>
  <div class="hello">
    <h2>{{ results }}</h2>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      results: ''
    }
  },
  mounted () {
    this.getHome()
  },
  methods: {
    async getHome () {
      const response = await axios.get('http://localhost:3000/api/home')
      this.results = response.data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
