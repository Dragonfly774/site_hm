<template>
  <div>
    <div class="s-header">
      <strong>Романов Семен</strong>
      <div>
        Программист звонит в библиотеку.
        <br>— Здравствуйте, Катю можно?
        <br>— Она в архиве.
        <br>— Разархивируйте ее пожалуйста. Она мне срочно нужна!
      </div>
      <s-button @click="logout">Выход</s-button>
    </div>
  </div>
</template>

<script>


export default {
  name: "AppHeader",
  methods: {
    logout() {
      // localStorage.setItem('token', '') // старое решение
      this.$store.commit('book/removeToken')
      this.$router.push('/login')
    }
  },
}
</script>

<style scoped>
.s-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  background: #a5eaa5;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
}

</style>