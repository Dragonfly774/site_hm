<template>
  <div>
    <form class="s-form" @submit.prevent>
      <h3 class="s-title">Добавить автора</h3>
      <s-input type="text" placeholder="Имя" v-model.trim="author.first_name" :class="{ 'error': errorFlag && !author.first_name }"/>
      <strong v-if="errorFlag && !author.first_name" style="color: #f84c4c; margin-bottom: 10px">Заполните поле</strong>

      <s-input type="text" placeholder="Фамилия" v-model.trim="author.second_name" :class="{ 'error': errorFlag && !author.second_name }"/>
      <strong v-if="errorFlag && !author.second_name" style="color: #f84c4c; margin-bottom: 10px">Заполните поле</strong>

      <s-input type="tel" v-mask="'##'" placeholder="Возраст" v-model="author.age" :class="{ 'error': errorFlag && !author.age }"/>
      <strong v-if="errorFlag && !author.age" style="color: #f84c4c; margin-bottom: 10px">Заполните поле</strong>

      <select style="border-radius: 5px; margin-bottom: 10px" v-model="countryValue">
        <option v-for="option in countrysOption">
          {{ option.name }}
        </option>
      </select>
      <s-button @click="addAuthor">Добавить</s-button>
    </form>
  </div>
</template>

<script>
import {mask} from 'vue-the-mask'

export default {
  directives: {mask},
  data() {
    return {
      author: {
        first_name: '',
        second_name: '',
        age: '',
        country: '',
      },
      countryValue: '',
      countrysOption: [],
      countrysList: {},
      errorFlag: false,
    }
  },
  methods: {
    addAuthor() {
      this.author.country = this.countryValue
      this.errorFlag = true;
      if (!this.author.first_name || !this.author.second_name || !this.author.age) {
        return;
      }

      this.$ajax.post('api/author/', {...this.author}).then(() => {
        this.$emit('create', {...this.author})
        this.author.first_name = ''
        this.author.second_name = ''
        this.author.age = ''
        this.author.country = ''
      })
    }
  },
  name: "CreateFormAuthors",
  mounted() {
    this.countrysList = this.$store.state.country
    const countrysListLenght = this.countrysList.countrys.length
    let i = 0
    while (countrysListLenght > i) {
      this.countrysOption.push(
          {value: this.countrysList.countrys[i].id, name: this.countrysList.countrys[i].name_of_the_country}
      )
      i++
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