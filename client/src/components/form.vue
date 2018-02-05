<template>
  <v-form v-model='valid'>
    <v-text-field
      label='Name'
      v-model='name'
      :value='name'
      @input='value => { name = value }'
      :rules='nameRules'
      :counter='10'
      required
    >
    </v-text-field>
    <v-text-field
    type="password"
    label='Password'
    v-model='password'
    :value='password'
    @input='value => { password = value }'
    required
    >
    </v-text-field>
  </v-form>
</template>
<script>
export default {
  name: 'Form',
  props: ['name', 'password'],
  data () {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ]
    }
  }
}
</script>
