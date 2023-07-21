<template>
  <div class="s-content-books">

    <s-dialog v-model="createFormVisible">
      <create-form-books @create="addBook"></create-form-books>
    </s-dialog>
    <s-dialog v-model="updateFormVisible">
      <update-form-books :booksUpData="bookUpDate" @update="updateBooksForm"></update-form-books>
    </s-dialog>
    <s-input style="margin-top: 15px; width: 90%;" type="text" placeholder="Поиск"
             v-model.trim="search"/>
    <div class="s-actions">
      <s-select v-model="selectedSort" :options="sortOptions"></s-select>
      <s-select v-model="switchSort" :options="switchSortOptions"
                style="margin-right: auto; margin-left: auto"></s-select>
      <s-button @click="createFormVisible=true" style="margin-left: auto;">
        Добавить
      </s-button>
    </div>


    <books-list :books="searchBookName" @remove="removeBooks" @update="updateBooks"></books-list>
  </div>
</template>

<script>
import CreateFormBooks from "@/components/bookComponents/CreateFormBooks.vue";
import BooksList from "@/components/bookComponents/BooksList.vue";
import UpdateFormBooks from "@/components/bookComponents/UpdateFormBooks.vue";

export default {
  name: "AppContentBooks",
  components: {BooksList, CreateFormBooks, UpdateFormBooks},
  data() {
    return {
      bookUpDate: [],
      books: [],
      name: '',
      annotation: '',
      author: '',
      genres: [],
      createFormVisible: false,
      updateFormVisible: false,
      counter: '', // она нужна для перерисовки страницы, везде где ее меняю, то перерисовывается страница
      switchSort: '', // направление сортировки
      switchSortOptions: [
        {value: "0", name: "По умолчанию"},
        {value: "1", name: "По возрастанию"},
        {value: "2", name: "По убыванию"},
      ],
      selectedSort: "",
      sortOptions: [
        {value: '', name: 'Без сортировки'},
        {value: 'id', name: 'По id'},
        {value: 'name', name: 'По название'},
        {value: 'annotation', name: 'По описанию',},
        {value: 'author', name: 'По автору',},
        {value: 'genres', name: 'По жанрам',},
      ],
      search: ''
    }
  },
  computed: {
    sortedBooks() {
      this.counter += 1
      if (this.switchSort === "2") {
        return [...this.books].sort((book1, book2) => String(book1[this.selectedSort])?.localeCompare(String(book2[this.selectedSort]))).reverse()
      } else {
        return [...this.books].sort((book1, book2) => String(book1[this.selectedSort])?.localeCompare(String(book2[this.selectedSort])))
      }
    },
    searchBookName() {
      // this.counter += 1
      return this.sortedBooks.filter(book => book.name.includes(this.search))
    }
  },
  methods: {
    addBook(book) {
      this.books.push(book)
      this.createFormVisible = false
    },

    removeBooks(book) {
      this.$ajax.delete(`api/book/${book.id}`).then((response) => {
        this.books = this.books.filter(elem => elem.id !== book.id)
      })
    },

    updateBooks(book) {
      //   это вызовется когда кнопка нажата будет из BookList
      this.bookUpDate = book
      this.updateFormVisible = true
    },
    updateBooksForm(book) {
      // тут что придет от формы
      this.updateFormVisible = false
      for (let i in this.books) {
        if (this.books[i].id === book.id) {
          this.books[i] = book
          this.counter += 1
          break
        }
      }
    }
  },
  mounted() {
    this.$ajax.get('api/book').then((response) => {
      this.books = response.data
    })
    this.$ajax.get('api/genre').then((response) => {
      this.$store.commit('genre/setGenres', response.data)
    })
    this.$ajax.get('api/author').then((response) => {
      this.$store.commit('author/setAuthors', response.data)
    })
  }

}
</script>

<style scoped>
.s-actions {
  display: flex;
  margin-top: 15px;
}

</style>