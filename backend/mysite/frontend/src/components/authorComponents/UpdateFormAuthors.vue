<template>
  <div>
    <form class="s-form" @submit.prevent>
      <h3 class="s-title">Изменит автора</h3>
      <s-input type="text" placeholder="Имя" v-model.trim="author.first_name" />

      <s-input type="text" placeholder="Фамилия" v-model.trim="author.second_name"  />

      <s-input type="tel" v-mask="'##'" placeholder="Возраст" v-model="author.age" />

      <select style="border-radius: 5px; margin-bottom: 10px" v-model="countryValue">
        <option v-for="option in countrysOption">
          {{ option.name }}
        </option>
      </select>
      <s-button @click="updateAuthors">Изменить</s-button>
    </form>
  </div>
</template>

<script>


import {mask} from "vue-the-mask";

export default {
  name: "UpdateFormAuthors",
  directives: {mask},
  props: {
    authorsUpData: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      author: {
        id: this.authorsUpData.id,
        first_name: this.authorsUpData.first_name,
        second_name: this.authorsUpData.second_name,
        age: this.authorsUpData.age,
        country: '',
      },
      countryValue: this.authorsUpData.country,
      // authorValue: this.authorsUpData.author.id || 1, // чтобы при id=0 работало
      // authorsList: {},
      // authorsOption: [],
      countrysOption: [],
      countrysList: {},
    }
  },
  methods: {

    updateAuthors() {
      this.author.country = this.countryValue
      this.$ajax.put(`api/author/${this.authorsUpData.id}/`, {...this.author}).then(() => {
        this.$emit('update', {...this.author})
      })
    }
  },
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
</style>