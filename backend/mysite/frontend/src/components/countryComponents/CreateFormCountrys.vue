<template>
<div>
    <form class="s-form" @submit.prevent>
      <h3 class="s-title">Добавить страну</h3>
      <s-input type="text" placeholder="Название" v-model.trim="countrys.name_of_the_country" :class="{ 'error': errorFlag && !countrys.name_of_the_country }"/>
      <strong v-if="errorFlag && !countrys.name_of_the_country" style="color: #f84c4c; margin-bottom: 10px">Заполните поле</strong>
      <s-button @click="addCounry">Добавить</s-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateFormCountrys",
  data() {
    return {
      countrys: {
        name_of_the_country: "",
      },
      errorFlag: false,
    }
  },
  methods: {
    addCounry() {
      this.errorFlag = true;
      if (!this.countrys.name_of_the_country ) {
        return;
      }
      this.$ajax.post('api/country/', {...this.countrys}).then(() => {
        this.$emit('create', {...this.countrys})
        this.countrys.name_of_the_country = ''
      })
    }
  }
}
</script>

<style scoped>
.s-form {
  background: #a5eaa5;
  border-radius: 8px;
  padding: 1px 10px 10px 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}
.error {
  border: 3px solid #f84c4c;
}
</style>