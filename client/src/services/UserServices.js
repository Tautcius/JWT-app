import Api from './Api'

export default {
  getHome () {
    return Api().get('home')
  },
  login () {
    return Api().post('login')
  },
  signup (credentials) {
    return Api().post('signup', credentials)
  }
}
