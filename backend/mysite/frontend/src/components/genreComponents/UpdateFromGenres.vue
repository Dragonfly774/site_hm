<template>
  <div>
    <form class="s-form" @submit.prevent>
      <h3 class="s-title">Изменить страну</h3>
      <s-input type="text" placeholder="Название" v-model.trim="genre.name"/>
      <s-input type="text" placeholder="Описание" v-model.trim="genre.description"/>
      <s-button @click="updateGenres">Изменить</s-button>
    </form>
  </div>
</template>

<script>


export default {
  name: "UpdateFormGenres",
  props: {
    genresUpData: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      genre: {
        id: this.genresUpData.id,
        name: this.genresUpData.name,
        description: this.genresUpData.description,
      },
    }
  },
  methods: {

    updateGenres() {
     this.$ajax.put(`api/genre/${this.genresUpData.id}/`, {...this.genre}).then(() => {
        this.$emit('update', {...this.genre})
      })
    }
  },

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