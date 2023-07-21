<template>
  <div class="s-content-genres">
    <s-dialog v-model="createFormVisible">
      <create-form-genres @create="addGenre"></create-form-genres>
    </s-dialog>
    <s-dialog v-model="updateFormVisible">
      <update-form-genres :genresUpData="genreUpData" @update="updateGenressForm"></update-form-genres>
    </s-dialog>
    <s-input style="margin-top: 15px; width: 90%;" type="text" placeholder="Поиск"
             v-model.trim="search"/>
    <div class="s-actions">
      <s-select v-model="selectedSort" :options="sortOptions"></s-select>
      <s-select v-model="switchSort" :options="switchSortOptions"
                style="margin-right: auto; margin-left: auto"></s-select>
      <s-button @click="createFormVisible=true" style="margin-left: auto">Добавить</s-button>
    </div>
    <genres-list :genres="searchGenreName" @remove="removeGenres" @update="updateGenres"></genres-list>
  </div>
</template>

<script>
import GenresList from "@/components/genreComponents/GenresList.vue";
import CreateFormGenres from "@/components/genreComponents/CreateFormGenres.vue";
import UpdateFormGenres from "@/components/genreComponents/UpdateFromGenres.vue";

export default {
  name: "AppContentGenres",
  components: {UpdateFormGenres, CreateFormGenres, GenresList},
  data() {
    return {
      genreUpData: [],
      genres: [],
      name: '',
      description: '',
      createFormVisible: false,
      updateFormVisible: false,
      search: '',
      counter: '',
      selectedSort: '',
      sortOptions: [
        {value: '', name: "Без сортировки"},
        {value: 'id', name: "По id"},
        {value: 'name', name: "По названию"},
        {value: 'description', name: "По описанию"},
      ],
      switchSort: '', // направление сортировки
      switchSortOptions: [
        {value: '0', name: "По умолчанию"},
        {value: '1', name: "По возрастанию"},
        {value: '2', name: "По убыванию"},
      ],
    }
  },
  computed: {
    sortedGenres() {
      this.counter += 1
      if (this.switchSort === "2") {
        return (
            [...this.genres].sort((genre1, genre2) =>
                String(genre1[this.selectedSort])?.localeCompare(String(genre2[this.selectedSort]))).reverse()
        )
      } else {
        return (
            [...this.genres].sort((genre1, genre2) =>
                String(genre1[this.selectedSort])?.localeCompare(String(genre2[this.selectedSort])))
        )
      }
    },
    searchGenreName() {
      // this.counter += 1
      return this.sortedGenres.filter(genre => genre.name.includes(this.search))
    }
  },
  methods: {
    addGenre(genre) {
      this.genres.push(genre)
      this.createFormVisible = false
    },
    removeGenres(genre) {
      this.$ajax.delete(`api/genre/${genre.id}`).then((response) => {
        this.genres = this.genres.filter(elem => elem.id !== genre.id)
      })
    },
    updateGenres(genre) {
      //   это вызовется когда кнопка нажата будет из BookList
      this.genreUpData = genre
      this.updateFormVisible = true
    },
    updateGenressForm(genre) {
      // тут что придет от формы
      this.updateFormVisible = false
      for (let i in this.genres) {
        if (this.genres[i].id === genre.id) {
          this.genres[i] = genre
          this.counter += 1
          break
        }
      }
    }
  },
  mounted() {
    this.$ajax.get('api/genre').then((response) => {
      this.genres = response.data
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