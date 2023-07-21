<template>
  <s-dialog v-model="showDialog">
    <form @submit.prevent="loginUser" class="s-login-form">
      <s-input type="text" placeholder="Username" v-model="username"/>
      <s-input type="password" placeholder="password" v-model="password"/>
      <s-button type="submit">
        Войти
      </s-button>
    </form>
  </s-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      username: '',
      password: '',
      showDialog: true,
    }
  },
  methods: {
    //   метод от сюда переносим в store, делаем метод как actions
    // mapActions помогает подтянуть конретные actions
    ...mapActions(['book/login']),
    loginUser() {
      this['book/login']({username: this.username, password: this.password, router: this.$router})
    }
  }
}
</script>


<style scoped>
.s-login-form {
  background: #a5eaa5;
  border-radius: 8px;
  padding: 1px 10px 10px 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}
</style>