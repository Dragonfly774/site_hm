<template>
  <div>
    <form class="s-form" @submit.prevent>
      <h3 class="s-title">Добавить книгу</h3>

      <s-input type="text" placeholder="Название" v-model.trim="book.name" :class="{ 'error': errorFlag && !book.name }"/>
      <strong v-if="errorFlag && !book.name" style="color: #f84c4c; margin-bottom: 10px">Заполните поле</strong>

      <s-textarea type="text" placeholder="Аннотация" v-model.trim="book.annotation" :class="{ 'error': errorFlag && !book.annotation }"/>
      <strong v-if="errorFlag && !book.annotation" style="color: #f84c4c; margin-bottom: 10px">Заполните поле</strong>

      <s-select style="margin-bottom: 10px; height: 25px; border-radius: 8px;"
                v-model.number="authorValue" :options="authorsOption"></s-select>

      <select multiple="multiple" style="border-radius: 5px; margin-bottom: 10px" v-model="genreValue">
        <option v-for="option in genresOption">
          {{ option.name }}
        </option>
      </select>

      <s-button @click="addBook">Добавить</s-button>
    </form>

  </div>
</template>

<script>


export default {
  name: "CreateFormBooks",
  data() {
    return {
      book: {
        name: '',
        annotation: '',
        author: '',
        genres: [],
      },
      genreValue: [],
      authorValue: 1, // чтобы при id=0 работало
      genresList: {},
      authorsList: {},
      genresOption: [],
      authorsOption: [],
      errorFlag: false,
    }
  },
  methods: {
    addBook() {
      this.errorFlag = true;
      if (!this.book.name || !this.book.annotation) {
        return;
      }

      this.book.genres = this.genreValue
      this.book.author = `${this.authorsList.authors[this.authorValue - 1].first_name} ${this.authorsList.authors[this.authorValue - 1].second_name}`
      this.$ajax.post('api/book/', {...this.book}).then(() => {
        this.$emit('create', {...this.book})
        this.book.name = ''
        this.book.annotation = ''
        this.book.author = ''
        this.book.genres = ''
      })
    },

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
    // console.log(this.authorsList.authors[2].id)
    // console.log(this.authorsList.authors[2].first_name)
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
.error {
  border: 3px solid #f84c4c;
}
</style>