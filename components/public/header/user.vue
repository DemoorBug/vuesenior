<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      <i @click="exit">退出</i>
    </template>
    <template v-else>
      <nuxt-link
        to="/login"
        class="login">立即登陆</nuxt-link>
      <nuxt-link
        class="register"
        to="/register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
 data () {
  return {
    user: ''
    }
  },
  async mounted () {
    const {status, data: {user}} = await this.$axios.get('/users/getUser')
    if (status === 200) {
      this.user = user
    }
  },
  methods: {
    async exit () {
      let {status,data} = await this.$axios.get('/users/exit')
      if(status===200&&data&&data.code===0){
        this.user = ''
      }
    }
  }
}
</script>

<style>

</style>
