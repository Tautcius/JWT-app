<template>
  <div class="hello">
    <h2>{{ results.message }}</h2>
  </div>
</template>

<script>
import UserService from '../services/UserServices'

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
      const response = await UserService.getHome()
      this.results = response.data
    }
  }
}
</script>
