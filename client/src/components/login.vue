<template>
  <div class="hello">
    <h2>{{ msg  }}</h2>
    <Form></Form>
  </div>
</template>

<script>
import Form from './form'

export default {
  name: 'login',
  components: {
    Form
  },
  data () {
    return {
      msg: 'login'
    }
  },
  methods: {
  }
}
</script>
