<template>
  <div>
    <form class="s-form" @submit.prevent>
      <h3 class="s-title">Добавить жанр</h3>
      <s-input type="text" placeholder="Название" v-model.trim="genres.name" :class="{ 'error': errorFlag && !genres.name }"/>
      <strong v-if="errorFlag && !genres.name" style="color: #f84c4c; margin-bottom: 10px">Заполните поле</strong>
      <s-input type="text" placeholder="Описание" v-model.trim="genres.description" :class="{ 'error': errorFlag && !genres.description }"/>
      <strong v-if="errorFlag && !genres.description" style="color: #f84c4c; margin-bottom: 10px">Заполните поле</strong>
      <s-button @click="addGenre">Добавить</s-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateFormGenres",
  data() {
    return {
      genres: {
        name: "",
        description: "",
      },
      errorFlag: false,
    }
  },
  methods: {
    addGenre() {
      this.errorFlag = true;
      if (!this.genres.name || !this.genres.description ) {
        return;
      }
      this.$ajax.post('api/genre/', {...this.genres}).then(() => {
        this.$emit('create', {...this.genres})
        this.genres.name = ''
        this.genres.description = ''
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
</style>