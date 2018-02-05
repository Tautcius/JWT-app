<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <form><input
    type="name"
    name="name"
    v-model="email"
    placeholder="name"/>
    <br>
    <input
    type="password"
    name="password"
    v-model="password"
    placeholder="password"/>
    </form>
    <button
    @click="register">
    SignUp</button>
  </div>
</template>

<script>
import UserServices from '@/services/Userservices'

export default {
  name: 'signup',
  data () {
    return {
      msg: 'signup',
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      await UserServices.signup({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>

</style>
