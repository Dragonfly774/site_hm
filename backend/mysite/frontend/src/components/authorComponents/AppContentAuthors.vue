<template>
  <div class="s-content-authors">
    <s-dialog v-model="createFormVisible">
      <create-form-authors @create="addAuthor"></create-form-authors>
    </s-dialog>
    <s-dialog v-model="updateFormVisible">
      <update-form-authors :authorsUpData="authorUpDate" @update="updateAuthorsForm"></update-form-authors>
    </s-dialog>
    <s-input style="margin-top: 15px; width: 90%;" type="text" placeholder="Поиск"
             v-model.trim="search"/>
    <div class="s-actions">
      <s-select v-model="selectedSort" :options="sortOptions"></s-select>
      <s-select v-model="switchSort" :options="switchSortOptions"
                style="margin-right: auto; margin-left: auto"></s-select>
      <s-button @click="createFormVisible=true" style="margin-left: auto; ">
        Добавить
      </s-button>
    </div>

    <author-list :authors="searchAuthorName" @remove="removeAuthors" @update="updateAuthors"></author-list>
  </div>
</template>

<script>
import CreateFormAuthors from "@/components/authorComponents/CreateFormAuthors.vue";
import AuthorList from "@/components/authorComponents/AuthorList.vue";
import UpdateFormAuthors from "@/components/authorComponents/UpdateFormAuthors.vue";

export default {
  components: {AuthorList, CreateFormAuthors, UpdateFormAuthors},
  name: "AppContentAuthors",
  data() {
    return {
      authorUpDate: [],
      authors: [],
      first_name: '',
      second_name: '',
      age: '',
      country: '',
      createFormVisible: false,
      updateFormVisible: false,
      counter: '', // она нужна для перерисовки страницы, везде где ее меняю, то перерисовывается страница
      search: '',
      switchSort: '', // направление сортировки
      switchSortOptions: [
        {value: "0", name: "По умолчанию"},
        {value: "1", name: "По возрастанию"},
        {value: "2", name: "По убыванию"},
      ],
      selectedSort: '',
      sortOptions: [
        {value: '', name: "Без сортировки"},
        {value: 'id', name: "По id"},
        {value: 'first_name', name: "По имени"},
        {value: 'second_name', name: "По фамилии"},
        {value: 'age', name: "По возрасту"},
        {value: 'country', name: "По стране"},
      ],
    }
  },
  computed: {
    sortedAuthors() {
      this.counter += 1
      if (this.switchSort === "2") {
        return (
            [...this.authors].sort((author1, author2) =>
                String(author1[this.selectedSort])?.localeCompare(String(author2[this.selectedSort]))).reverse()
        )
      } else {
        return (
            [...this.authors].sort((author1, author2) =>
                String(author1[this.selectedSort])?.localeCompare(String(author2[this.selectedSort])))
        )
      }
    },
    searchAuthorName() {
      // this.counter += 1
      return this.sortedAuthors.filter(author => author.first_name.includes(this.search))
    }
  },
  methods: {
    addAuthor(author) {
      this.authors.push(author)
      this.createFormVisible = false
    },
    removeAuthors(author) {
      this.$ajax.delete(`api/author/${author.id}`).then((response) => {
        this.authors = this.authors.filter(elem => elem.id !== author.id)
      })
    },

     updateAuthors(author) {
      //   это вызовется когда кнопка нажата будет из AuthorsList
      this.authorUpDate = author
      this.updateFormVisible = true
    },

    updateAuthorsForm(author) {
      // тут что придет от формы
      this.updateFormVisible = false
      for (let i in this.authors) {
        if (this.authors[i].id === author.id) {
          this.authors[i] = author
          this.counter += 1
          break
        }
      }
    }
  },
  mounted() {
    this.$ajax.get('api/author').then((response) => {
      this.authors = response.data
    }),
        this.$ajax.get('api/country').then((response) => {
          this.$store.commit('country/setCountrys', response.data)
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