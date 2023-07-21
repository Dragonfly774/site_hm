<template>
  <div>
    <form class="s-form" @submit.prevent>
      <h3 class="s-title">Изменить книгу</h3>
      <s-input type="text" placeholder="Название" v-model.trim="book.name"/>
      <s-textarea type="text" placeholder="Аннотация" v-model.trim="book.annotation"/>
      <s-select style="margin-bottom: 10px; height: 25px; border-radius: 8px;" v-model.number="authorValue"
                :options="authorsOption"></s-select>
      <select multiple="multiple" style="border-radius: 5px; margin-bottom: 10px" v-model="genreValue">
        <option v-for="option in genresOption">
          {{ option.name }}
        </option>
      </select>
      <s-button @click="updateBooks">Изменить</s-button>
    </form>
  </div>
</template>

<script>


export default {
  name: "UpdateFormBooks",
  props: {
    booksUpData: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      book: {
        id: this.booksUpData.id,
        name: this.booksUpData.name,
        annotation: this.booksUpData.annotation,
        author: '',
        genres: [],
      },
      genreValue: this.booksUpData.genres,
      authorValue: this.booksUpData.author.id || 1, // чтобы при id=0 работало
      genresList: {},
      authorsList: {},
      genresOption: [],
      authorsOption: [],
    }
  },
  methods: {

    updateBooks() {
      this.book.genres = this.genreValue
      this.book.author = `${this.authorsList.authors[this.authorValue - 1].first_name} ${this.authorsList.authors[this.authorValue - 1].second_name}`
      this.$ajax.put(`api/book/${this.booksUpData.id}/`, {...this.book}).then(() => {
        this.$emit('update', {...this.book})
      })
    }
  },
  mounted() {
    this.genresList = this.$store.state.genre
    const genresListLength = this.genresList.genres.length
    let i = 0
    while (genresListLength > i) {
      this.genresOption.push(
          {value: this.genresList.genres[i].id, name: this.genresList.genres[i].name}
      )
      i++
    }
    this.authorsList = this.$store.state.author
    const authorsListLength = this.authorsList.authors.length
    let j = 0
    while (authorsListLength > j) {
      this.authorsOption.push(
          {
            value: this.authorsList.authors[j].id,
            name: `${this.authorsList.authors[j].first_name} ${this.authorsList.authors[j].second_name}`
          }
      )
      j++
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